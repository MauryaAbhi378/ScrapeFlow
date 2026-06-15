-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkFlowExecution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "definition" TEXT NOT NULL DEFAULT '{}',
    "creditsConsumed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "WorkFlowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkFlowExecution" ("completedAt", "createdAt", "creditsConsumed", "id", "startedAt", "status", "trigger", "userId", "workflowId") SELECT "completedAt", "createdAt", "creditsConsumed", "id", "startedAt", "status", "trigger", "userId", "workflowId" FROM "WorkFlowExecution";
DROP TABLE "WorkFlowExecution";
ALTER TABLE "new_WorkFlowExecution" RENAME TO "WorkFlowExecution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
