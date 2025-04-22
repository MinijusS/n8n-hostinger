import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class HostingerApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hostinger API',
		name: 'hostingerApi',
		icon: 'file:hostingerLogo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["action"]}}',
		description: 'Interact with the Hostinger API',
		defaults: {
			name: 'Hostinger API',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'hostingerApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				options: [
					{ name: 'Get Action', value: 'getAction' },
					{ name: 'List Actions', value: 'listActions' },
					{ name: 'Delete Backup', value: 'deleteBackup' },
					{ name: 'List Backups', value: 'listBackups' },
					{ name: 'Restore Backup', value: 'restoreBackup' },
					{ name: 'List Data Centers', value: 'listDataCenters' },
					{ name: 'Create PTR', value: 'createPTR' },
					{ name: 'Delete PTR', value: 'deletePTR' },
					{ name: 'Activate Firewall', value: 'activateFirewall' },
					{ name: 'Deactivate Firewall', value: 'deactivateFirewall' },
					{ name: 'Get Firewall', value: 'getFirewall' },
					{ name: 'Delete Firewall', value: 'deleteFirewall' },
					{ name: 'List Firewalls', value: 'listFirewalls' },
					{ name: 'Create Firewall', value: 'createFirewall' },
					{ name: 'Update Firewall Rule', value: 'updateFirewallRule' },
					{ name: 'Delete Firewall Rule', value: 'deleteFirewallRule' },
					{ name: 'Create Firewall Rule', value: 'createFirewallRule' },
					{ name: 'Sync Firewall', value: 'syncFirewall' },
					{ name: 'Get Monarx', value: 'getMonarx' },
					{ name: 'Add Monarx', value: 'addMonarx' },
					{ name: 'Remove Monarx', value: 'removeMonarx' },
					{ name: 'Get Template', value: 'getTemplate' },
					{ name: 'List Templates', value: 'listTemplates' },
					{ name: 'Get Post Install Script', value: 'getPostInstallScript' },
					{ name: 'Update Post Install Script', value: 'updatePostInstallScript' },
					{ name: 'Delete Post Install Script', value: 'deletePostInstallScript' },
					{ name: 'List Post Install Scripts', value: 'listPostInstallScripts' },
					{ name: 'Create Post Install Script', value: 'createPostInstallScript' },
					{ name: 'Attach Public Key', value: 'attachPublicKey' },
					{ name: 'Delete Public Key', value: 'deletePublicKey' },
					{ name: 'List Public Keys', value: 'listPublicKeys' },
					{ name: 'Create Public Key', value: 'createPublicKey' },
					{ name: 'Create Recovery', value: 'createRecovery' },
					{ name: 'Delete Recovery', value: 'deleteRecovery' },
					{ name: 'Get Snapshot', value: 'getSnapshot' },
					{ name: 'Create Snapshot', value: 'createSnapshot' },
					{ name: 'Delete Snapshot', value: 'deleteSnapshot' },
					{ name: 'Restore Snapshot', value: 'restoreSnapshot' },
					{ name: 'Get VM Public Keys', value: 'getVmPublicKeys' },
					{ name: 'Update Hostname', value: 'updateHostname' },
					{ name: 'Delete Hostname', value: 'deleteHostname' },
					{ name: 'Get VM', value: 'getVm' },
					{ name: 'List VMs', value: 'listVms' },
					{ name: 'Get VM Metrics', value: 'getVmMetrics' },
					{ name: 'Update Nameservers', value: 'updateNameservers' },
					{ name: 'Update Panel Password', value: 'updatePanelPassword' },
					{ name: 'Recreate VM', value: 'recreateVm' },
					{ name: 'Restart VM', value: 'restartVm' },
					{ name: 'Update Root Password', value: 'updateRootPassword' },
					{ name: 'Setup VM', value: 'setupVm' },
					{ name: 'Start VM', value: 'startVm' },
					{ name: 'Stop VM', value: 'stopVm' }
				],
				default: '',
			},
			{
				displayName: 'Virtual Machine ID',
				name: 'virtualMachineId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: [
							'getAction', 'listActions', 'deleteBackup', 'listBackups', 'restoreBackup', 'createPTR', 'deletePTR', 'activateFirewall', 'deactivateFirewall', 'syncFirewall', 'getMonarx', 'addMonarx', 'removeMonarx', 'attachPublicKey', 'createRecovery', 'deleteRecovery', 'getSnapshot', 'createSnapshot', 'deleteSnapshot', 'restoreSnapshot', 'getVmPublicKeys', 'updateHostname', 'deleteHostname', 'getVm', 'getVmMetrics', 'updateNameservers', 'updatePanelPassword', 'recreateVm', 'restartVm', 'updateRootPassword', 'setupVm', 'startVm', 'stopVm'
						]
					}
				}
			},
			{
				displayName: 'Action ID',
				name: 'actionId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['getAction']
					}
				}
			},
			{
				displayName: 'Backup ID',
				name: 'backupId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['deleteBackup', 'restoreBackup']
					}
				}
			},
			{
				displayName: 'Firewall ID',
				name: 'firewallId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: [
							'activateFirewall', 'deactivateFirewall', 'getFirewall', 'deleteFirewall', 'updateFirewallRule', 'deleteFirewallRule', 'createFirewallRule', 'syncFirewall'
						]
					}
				}
			},
			{
				displayName: 'Rule ID',
				name: 'ruleId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['updateFirewallRule', 'deleteFirewallRule']
					}
				}
			},
			{
				displayName: 'Post Install Script ID',
				name: 'postInstallScriptId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['getPostInstallScript', 'updatePostInstallScript', 'deletePostInstallScript']
					}
				}
			},
			{
				displayName: 'Public Key ID',
				name: 'publicKeyId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['deletePublicKey']
					}
				}
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						action: ['getTemplate']
					}
				}
			},
			{
				displayName: 'Request Body',
				name: 'requestBody',
				type: 'json',
				default: '{}',
				description: 'Raw JSON body for POST/PUT requests.',
				displayOptions: {
					show: {
						action: [
							'createPTR', 'restoreBackup', 'activateFirewall', 'deactivateFirewall', 'createFirewall', 'updateFirewallRule', 'createFirewallRule', 'syncFirewall', 'addMonarx', 'updatePostInstallScript', 'createPostInstallScript', 'attachPublicKey', 'createPublicKey', 'createRecovery', 'restoreSnapshot', 'updateHostname', 'updateNameservers', 'updatePanelPassword', 'recreateVm', 'restartVm', 'updateRootPassword', 'setupVm', 'startVm', 'stopVm'
						]
					}
				}
			}
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const action = this.getNodeParameter('action', i) as string;
			const getParam = (name: string) => this.getNodeParameter(name, i) as string;
			let method: IHttpRequestMethods = 'GET';
			let endpoint = '';
			let requestBody: IDataObject | undefined;

			try {
				requestBody = JSON.parse(this.getNodeParameter('requestBody', i) as string);
			} catch (e) {}

			switch (action) {
				case 'getAction': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/actions/${getParam('actionId')}`; break;
				case 'listActions': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/actions`; break;
				case 'deleteBackup': method = 'DELETE'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/backups/${getParam('backupId')}`; break;
				case 'listBackups': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/backups`; break;
				case 'restoreBackup': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/backups/${getParam('backupId')}/restore`; break;
				case 'listDataCenters': endpoint = '/api/vps/v1/data-centers'; break;
				case 'createPTR': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/ptr`; break;
				case 'deletePTR': method = 'DELETE'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/ptr`; break;
				case 'activateFirewall': method = 'POST'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}/activate/${getParam('virtualMachineId')}`; break;
				case 'deactivateFirewall': method = 'POST'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}/deactivate/${getParam('virtualMachineId')}`; break;
				case 'getFirewall': endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}`; break;
				case 'deleteFirewall': method = 'DELETE'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}`; break;
				case 'listFirewalls': endpoint = '/api/vps/v1/firewall'; break;
				case 'createFirewall': method = 'POST'; endpoint = '/api/vps/v1/firewall'; break;
				case 'updateFirewallRule': method = 'PUT'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}/rules/${getParam('ruleId')}`; break;
				case 'deleteFirewallRule': method = 'DELETE'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}/rules/${getParam('ruleId')}`; break;
				case 'createFirewallRule': method = 'POST'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}/rules`; break;
				case 'syncFirewall': method = 'POST'; endpoint = `/api/vps/v1/firewall/${getParam('firewallId')}/sync/${getParam('virtualMachineId')}`; break;
				case 'getMonarx': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/monarx`; break;
				case 'addMonarx': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/monarx`; break;
				case 'removeMonarx': method = 'DELETE'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/monarx`; break;
				case 'getTemplate': endpoint = `/api/vps/v1/templates/${getParam('templateId')}`; break;
				case 'listTemplates': endpoint = '/api/vps/v1/templates'; break;
				case 'getPostInstallScript': endpoint = `/api/vps/v1/post-install-scripts/${getParam('postInstallScriptId')}`; break;
				case 'updatePostInstallScript': method = 'PUT'; endpoint = `/api/vps/v1/post-install-scripts/${getParam('postInstallScriptId')}`; break;
				case 'deletePostInstallScript': method = 'DELETE'; endpoint = `/api/vps/v1/post-install-scripts/${getParam('postInstallScriptId')}`; break;
				case 'listPostInstallScripts': endpoint = '/api/vps/v1/post-install-scripts'; break;
				case 'createPostInstallScript': method = 'POST'; endpoint = '/api/vps/v1/post-install-scripts'; break;
				case 'attachPublicKey': method = 'POST'; endpoint = `/api/vps/v1/public-keys/attach/${getParam('virtualMachineId')}`; break;
				case 'deletePublicKey': method = 'DELETE'; endpoint = `/api/vps/v1/public-keys/${getParam('publicKeyId')}`; break;
				case 'listPublicKeys': endpoint = '/api/vps/v1/public-keys'; break;
				case 'createPublicKey': method = 'POST'; endpoint = '/api/vps/v1/public-keys'; break;
				case 'createRecovery': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/recovery`; break;
				case 'deleteRecovery': method = 'DELETE'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/recovery`; break;
				case 'getSnapshot': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/snapshot`; break;
				case 'createSnapshot': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/snapshot`; break;
				case 'deleteSnapshot': method = 'DELETE'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/snapshot`; break;
				case 'restoreSnapshot': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/snapshot/restore`; break;
				case 'getVmPublicKeys': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/public-keys`; break;
				case 'updateHostname': method = 'PUT'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/hostname`; break;
				case 'deleteHostname': method = 'DELETE'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/hostname`; break;
				case 'getVm': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}`; break;
				case 'listVms': endpoint = '/api/vps/v1/virtual-machines'; break;
				case 'getVmMetrics': endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/metrics`; break;
				case 'updateNameservers': method = 'PUT'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/nameservers`; break;
				case 'updatePanelPassword': method = 'PUT'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/panel-password`; break;
				case 'recreateVm': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/recreate`; break;
				case 'restartVm': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/restart`; break;
				case 'updateRootPassword': method = 'PUT'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/root-password`; break;
				case 'setupVm': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/setup`; break;
				case 'startVm': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/start`; break;
				case 'stopVm': method = 'POST'; endpoint = `/api/vps/v1/virtual-machines/${getParam('virtualMachineId')}/stop`; break;
				default: throw new Error(`Unsupported action: ${action}`);
			}

			const requestConfig = {
				method,
				url: 'https://developers.hostinger.com' + endpoint,
				body: requestBody,
				json: true,
			};

			try {
				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'hostingerApi', requestConfig);
				returnData.push({ json: { response } });
			} catch (error) {
				returnData.push({ json: { error: (error as Error).message, request: requestConfig } });
			}
		}

		return [returnData];
	}
}
