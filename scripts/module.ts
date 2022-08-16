import { MODULE_NAME, MODULE_ID, OPT_SURGE_TYPE } from "./Settings";
import MagicSurgeCheck from "./MagicSurgeCheck";
import IncrementalCheck from "./utils/IncrementalCheck";
import RoundCheck from "./RoundCheck";
import ModuleSettings from "./ModuleSettings";
import { ActorHelperPanel } from "./panels/ActorHelperPanel";
import { RoundData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/data/documents/combat";

Hooks.on("init", function () {
  console.info(`Registering ${MODULE_NAME} Settings.`);

  const moduleSettings = new ModuleSettings();
  moduleSettings.Register();

  console.info(`Settings for ${MODULE_NAME} registered successfully.`);
});

Hooks.on("createChatMessage", (chatMessage: ChatMessage) => {
  if (hasProperty(chatMessage, "flags.damage-log")) return;
  const actor = game.actors.get(chatMessage.speaker.actor);
  if (!actor) {
    return false;
  }
  const magicSurgeCheck = new MagicSurgeCheck(actor, chatMessage.speaker.token);
  magicSurgeCheck.CheckChatMessage(chatMessage);
});

Hooks.on("updateCombat", async function (roundData: RoundData) {
  if (
    game.settings.get(`${MODULE_ID}`, `${OPT_SURGE_TYPE}`) ===
    `INCREMENTAL_CHECK_CHAOTIC`
  ) {
    const actor = game.actors.get(roundData.combatant.actor.id);
    if (!actor) {
      return false;
    }
    RoundCheck.Check(actor);
  }
});

Hooks.on(
  "wild-magic-surge-5e.ResetIncrementalCheck",
  async function (actorId: string) {
    const actor = game.actors.get(actorId);
    if (!actor) {
      return false;
    }

    // @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
    const incrementalCheck = new IncrementalCheck(actor);
    await incrementalCheck.Reset();
  }
);

Hooks.on(
  "renderActorSheet",
  async function (app: FormApplication, html: object, data: object) {
    const openButton = $(
      `<a class="open-actor-wms" title="Wild Magic Surge 5e Information"><i class="fas fa-wrench"></i>WMS</a>`
    );
    openButton.on("click", () => {
      new ActorHelperPanel(app.document, { actor: data.actor }).render(true);
    });
    html.closest(".app").find(".open-actor-wms").remove();
    const titleElement = html.closest(".app").find(".window-title");
    if (!app._minimized) openButton.insertAfter(titleElement);
  }
);