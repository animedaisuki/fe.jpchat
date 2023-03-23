import { loadOhMyLive2D } from "oh-my-live2d";

export default function loadOhMyLive2DConfig() {
  loadOhMyLive2D({
    sayHello: false,
    source: "https://amahane.s3.ap-northeast-1.amazonaws.com/live2dmodels",
    models: [
      {
        path: `/live2d-widget-model-poi/poi.model.json`,
        scale: 4,
      },
    ],
    tips: {
      style: {
        offsetY: 100,
      },
      welcomeTips: {
        message: {
          daybreak: "おはようございます、主人様~",
          morning: "主人様！お仕事は順調ですか？",
          noon: "主人様、お昼ご飯の時間ですよ、一緒に食べましょう！",
          afternoon: "少々お待ちください、コーヒーを淹れて参りますね~",
          night: "ご主人様~お帰りなさいませ~",
          dusk: "一日お疲れ様でした、ご主人様！",
          lateNight: "おやすみなさい、主人様~",
          weeHours: "おやすみなさい、主人様~",
        },
        persistTime: 2000,
        interval: 60000,
      },
      idleTips: {
        message: "世界のことすきです",
        persistTime: 2000,
        interval: 60000,
      },
    },
  });
}
