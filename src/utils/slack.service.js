import { config } from "../config.js";
import { publishMessage } from "../controller/slack.controller.js";
import { getMonthlyLibarians, getLibariansByDate } from "../data/rotation.js";
import { getTomorrow } from "./date.js";

export async function postSlackTomorrowLibrarians() {
  const tomorrow = getTomorrow(new Date());
  const libarians = await getLibariansByDate(tomorrow);

  // 테스트 서버용, 테스트 완료 후 삭제 예정
  if (libarians.length === 0) {
    return publishMessage(config.slack.jip, `내일은 사서가 없는 날입니다!`);
  }

  const messages = libarians.map((libarian) => {
    const { intraId, slackId } = libarian;
    let channel = slackId;
    if (process.env.BACKEND_LOCAL_HOST || process.env.BACKEND_TEST_HOST) {
      channel = config.slack.jip;
    }
    return publishMessage(
      channel,
      `[리마인드] ${intraId}님은 내일(${tomorrow}) 사서입니다!`,
    );
  });
  await Promise.all(messages);
}
