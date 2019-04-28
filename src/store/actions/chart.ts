import { Constants } from "./constants";

export function selectSectionWithDirection(date: Date) {
  return {
    type: Constants.SELECT_DATE_SECTION,
    payload: date,
  }
}
