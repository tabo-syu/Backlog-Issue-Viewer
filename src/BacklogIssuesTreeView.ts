import { TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';
import BacklogApiClient from './utils/backlogApi';
import { IssueResponse } from './utils/backlogApi/types';
import path from 'path';

type Cache = IssueResponse[] | null;

export class BacklogIssuesTreeProvider implements TreeDataProvider<TreeItem> {
  private cache: Cache;

  constructor(private client: BacklogApiClient) {
    this.cache = null;
  }

  private async fetch(): Promise<IssueResponse[]> {
    const { id } = await this.client.users.fetch('myself');

    const projects = await this.client.projects.fetch();
    const allStatuses = (
      await Promise.all(
        projects.map((project) =>
          this.client.projects.statuses(project.id.toString())
        )
      )
    ).flat();
    // 完了は固定でidが4
    const inProgressStatus = allStatuses.filter((status) => status.id !== 4);
    const statusIdSet = Array.from(
      new Set(inProgressStatus.map((status) => status.id))
    );

    const issues = await this.client.issues.fetch({
      assigneeId: [id],
      statusId: statusIdSet,
      sort: 'dueDate',
      order: 'asc',
    });

    return issues.filter((issue) => issue.dueDate !== null);
  }

  public getTreeItem(element: TreeItem): TreeItem {
    return element;
  }

  public async getChildren(element?: TreeItem): Promise<TreeItem[]> {
    const issues = this.cache === null ? await this.fetch() : this.cache;
    if (this.cache === null) {
      this.cache = issues;
    }

    if (element instanceof BacklogIssue) {
      const issue = issues.find((issue) => issue.id === element.issue.id);
      return [
        new BacklogDueDate(
          issue?.dueDate ?? '未定',
          TreeItemCollapsibleState.None
        ),
      ];
    }

    if (!element) {
      return issues.map(
        (issue) => new BacklogIssue(issue, TreeItemCollapsibleState.Collapsed)
      );
    }

    return [];
  }
}

export class BacklogDueDate extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }
  public iconPath = {
    light: path.join(__filename, '..', '..', 'assets', 'event_note_black.svg'),
    dark: path.join(__filename, '..', '..', 'assets', 'event_note_white.svg'),
  };
}

export class BacklogIssue extends TreeItem {
  constructor(
    public readonly issue: IssueResponse,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(issue.summary, collapsibleState);
  }
}
