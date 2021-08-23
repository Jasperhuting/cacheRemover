// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from "child_process";


const environment = 
	{ 
		'test': {
			name: 'jbtest'
		},
		'acceptance': {
			name: 'jbaccept'
		}
	};

	export function deleteCache(environment: { name: string }) {
		vscode.window.createTerminal();
		const term = vscode.window.createTerminal('Dawn');
		term.show();
		term.sendText(`ssh -p 339 ${environment.name}@staging993.hipex.io`);
		term.sendText(`cd ~/domains/${environment.name}.justbrands.nl/backend/current/backend && bin/magento cache:clean && supervisorctl restart varnish:00`); 		
		term.sendText('docker restart testapplication_apollo-server-tweakwise_1 testapplication_apollo-server-prismic_1 testapplication_apollo-server-prismic-rest_1 testapplication_apollo-server-tweakwise-m2-graphql_1 testapplication_apollo-server-m2-graphql-proxy_1 testapplication_apollo-server_1 testapplication_apollo-server_2 testapplication_apollo-server_3 testapplication_apollo-server_4 testapplication_apollo-server_5 testapplication_apollo-server_6 testapplication_apollo-server_7 testapplication_apollo-server_8 testapplication_apollo-server_9 testapplication_apollo-server_10 && exit'); 		
		term.hide();
		vscode.window.showInformationMessage(`Cache op ${environment.name} is verwijderd`);
		term.dispose();
	}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "justbrands" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let removeCashTest = vscode.commands.registerCommand('justbrands.removeCacheTest', async () => {	
		deleteCache(environment['test']);
	});

	

	let removeCashAcceptance = vscode.commands.registerCommand('justbrands.removeCacheAcceptance', () => {
		deleteCache(environment['acceptance']);
	});

	context.subscriptions.push(removeCashTest);
	context.subscriptions.push(removeCashAcceptance);
}

// this method is called when your extension is deactivated
export function deactivate() {}
