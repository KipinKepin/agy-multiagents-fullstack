const vscode = require("vscode");
const path = require("path");
const fs = require("fs").promises;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Antigravity Multiagents Starterpack extension is now active!");

  const disposable = vscode.commands.registerCommand(
    "antigravity-multiagents-starterpack.initializeProject",
    async function () {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage(
          "No workspace folder open. Please open a project folder in VS Code first.",
        );
        return;
      }

      const projectName = await vscode.window.showInputBox({
        prompt: "Enter the name of your new AI Agents project",
        placeHolder: "antigravity-orchestrator",
        ignoreFocusOut: true,
      });

      if (!projectName) {
        vscode.window.showInformationMessage("Initialization cancelled.");
        return;
      }

      const workspaceRoot = workspaceFolders[0].uri.fsPath;

      const targetWorkspacePath = path.join(workspaceRoot, projectName);
      const sourceTemplatesPath = path.join(context.extensionPath, "templates");

      let forceOverwrite = false;

      try {
        await fs.access(targetWorkspacePath);

        const userChoice = await vscode.window.showWarningMessage(
          `The folder '${projectName}' already exists. Do you want to overwrite its contents?`,
          { modal: true },
          "Overwrite",
        );

        if (userChoice !== "Overwrite") {
          vscode.window.showInformationMessage("Initialization cancelled.");
          return;
        }

        forceOverwrite = true;
      } catch (error) {}

      try {
        await fs.access(sourceTemplatesPath);

        await fs.cp(sourceTemplatesPath, targetWorkspacePath, {
          recursive: true,
          force: forceOverwrite,
        });

        vscode.window.showInformationMessage(
          `Starter Pack successfully initialized in '${projectName}'!`,
        );
      } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage(
          `Failed to initialize agents: ${error.message}`,
        );
      }
    },
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
