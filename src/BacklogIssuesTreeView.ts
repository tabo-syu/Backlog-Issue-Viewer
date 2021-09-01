import { TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { Backlog } from 'backlog-js';
import { ProjectResponse, UserResponse, IssueResponse } from './utils/types';

export class BacklogIssuesTreeProvider
  implements TreeDataProvider<BacklogIssue>
{
  constructor(private client: Backlog) {}

  getTreeItem(element: BacklogIssue): TreeItem {
    return element;
  }

  async getChildren(element: BacklogIssue): Promise<BacklogIssue[]> {
    const { id } = (await this.client.getMyself()) as UserResponse;

    console.log(id);

    const projects = (await this.client.getProjects()) as ProjectResponse[];
    const allStatuses = (
      await Promise.all(
        projects.map((project) =>
          this.client.getProjectStatuses(project.id.toString())
        )
      )
    ).flat();
    const inProgressStatus = allStatuses.filter(
      (status) => status.name !== '完了'
    );

    const issues = (await this.client.getIssues({
      assigneeId: [id],
      statusId: inProgressStatus.map((status) => status.id),
      sort: 'dueDate',
      order: 'asc',
    })) as IssueResponse[];

    if (element) {
      return issues.map(
        (issue) =>
          new BacklogIssue(issue.summary, TreeItemCollapsibleState.None)
      );
    } else {
      return issues.map(
        (issue) =>
          new BacklogStatus(
            issue.status.name,
            TreeItemCollapsibleState.Collapsed
          )
      );
    }
  }
}

export class BacklogStatus extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }
}

export class BacklogIssue extends TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }
}
