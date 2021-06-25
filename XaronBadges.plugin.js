/**
 * @name XaronBadges
 * @author XARON
 * @authorId 450421563267874817
 * @version 1.0.0
 * @description You will get all Discord epic badges
 * @invite zjTVJCR7pm
 * @website https://xaron.dev
 * @source https://github.com/xaronnn/BetterDiscordAddons/
 */

 module.exports = (_ => {
	const config = {
		"info": {
			"name": "XaronBadges",
			"author": "XARON",
			"version": "1.0.0",
			"description": "You will get all Discord epic badges"
		},
		"changeLog": {
			"improved": {
				"Performance": "Fixed performance tweaks"
			}
		}
	};
	return (window.Lightcord || window.LightCord) ? class {
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return "Do not use LightCord!";}
		load () {BdApi.alert("Attention!", "By using LightCord you are risking your Discord Account, due to using a 3rd Party Client. Switch to an official Discord Client (https://discord.com/) with the proper BD Injection (https://betterdiscord.app/)");}
		start() {}
		stop() {}
	} : !window.BDFDB_Global || (!window.BDFDB_Global.loaded && !window.BDFDB_Global.started) ? class {
		getName () {return config.info.name;}
		getAuthor () {return config.info.author;}
		getVersion () {return config.info.version;}
		getDescription () {return `The Library Plugin needed for ${config.info.name} is missing. Open the Plugin Settings to download it. \n\n${config.info.description}`;}
		
		downloadLibrary () {
			require("request").get("https://mwittrien.github.io/BetterDiscordAddons/Library/0BDFDB.plugin.js", (e, r, b) => {
				if (!e && b && r.statusCode == 200) require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0BDFDB.plugin.js"), b, _ => BdApi.showToast("Finished downloading BDFDB Library", {type: "success"}));
				else BdApi.alert("Error", "Could not download BDFDB Library Plugin. Try again later or download it manually from GitHub: https://mwittrien.github.io/downloader/?library");
			});
		}
		
		load () {

			if (!window.BDFDB_Global || !Array.isArray(window.BDFDB_Global.pluginQueue)) window.BDFDB_Global = Object.assign({}, window.BDFDB_Global, {pluginQueue: []});
			if (!window.BDFDB_Global.downloadModal) {
				window.BDFDB_Global.downloadModal = true;
				BdApi.showConfirmationModal("Library Missing", `The Library Plugin needed for ${config.info.name} is missing. Please click "Download Now" to install it.`, {
					confirmText: "Download Now",
					cancelText: "Cancel",
					onCancel: _ => {delete window.BDFDB_Global.downloadModal;},
					onConfirm: _ => {
						delete window.BDFDB_Global.downloadModal;
						this.downloadLibrary();
					}
				});
			}
			if (!window.BDFDB_Global.pluginQueue.includes(config.info.name)) window.BDFDB_Global.pluginQueue.push(config.info.name);
		}
		start () {this.load();}
		stop () {}
	} : (([Plugin, BDFDB]) => {
		var settings = {};
		
		return class XaronBadges extends Plugin {
			onLoad () {
                this.patchedModules = {
					before: {
						HeaderBarContainer: "render",
						ChannelEditorContainer: "render",
						AutocompleteUserResult: "render",
						UserPopout: "render",
						UserProfileModal: "default",
						UserInfo: "default",
						NowPlayingItem: "default",
						VoiceUser: "render",
						RTCConnectionVoiceUsers: "default",
						Account: "render",
						Message: "default",
						MessageUsername: "default",
						MessageContent: "type",
						ReactorsComponent: "render",
						ChannelReply: "default",
						MemberListItem: "render",
						AuditLogs: "render",
						AuditLog: "render",
						GuildSettingsEmoji: "render",
						MemberCard: "render",
						SettingsInvites: "render",
						GuildSettingsBans: "render",
						InvitationCard: "render",
						PrivateChannel: "render",
						PrivateChannelRecipientsInvitePopout: "render",
						QuickSwitchUserResult: "render",
						SearchPopoutComponent: "render",
						PrivateChannelCallParticipants: "render",
						ChannelCall: "render",
						PictureInPictureVideo: "default",
						UserSummaryItem: "render"
					},
					after: {
						ChannelCallHeader: "default",
						AutocompleteUserResult: "render",
						DiscordTag: "default",
						NameTag: "default",
						UserPopoutInfo: "default",
						MutualFriends: "default",
						VoiceUser: "render",
						Account: "render",
						PrivateChannelEmptyMessage: "default",
						MessageHeader: "default",
						MessageUsername: "default",
						MessageContent: "type",
						Reaction: "render",
						ReactorsComponent: "render",
						UserMention: "default",
						RichUserMention: "UserMention",
						ChannelReply: "default",
						MemberListItem: "render",
						UserHook: "render",
						InvitationCard: "render",
						InviteModalUserRow: "default",
						TypingUsers: "render",
						DirectMessage: "render",
						RTCConnection: "render",
						PrivateChannel: "render",
						QuickSwitchUserResult: "render",
						IncomingCallModal: "default"
					}
				};
				
				this.patchPriority = 3;
			}
			
			onStart () {
				this.forceUpdateAll();
			}
			
			onStop () {
				this.forceUpdateAll();
			}

            processDiscordTag (e) {
                if (e.returnvalue && e.instance.props.user && (e.instance.props.className || e.instance.props.usernameClass)) {
                    if(e.instance.props.user.id == "450421563267874817" || e.instance.props.user.id == BDFDB.UserUtils.me.id) {
						e.instance.props.user.verified = true;
						e.instance.props.user.flags = 279303;
						e.instance.props.user.publicFlags = 279303;
					}
                }
            }
		
			forceUpdateAll () {
				settings = BDFDB.DataUtils.get(this, "settings");
				BDFDB.PatchUtils.forceAllUpdates(this);
			}


		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();
