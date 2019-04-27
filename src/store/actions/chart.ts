import { Note } from "../../interfaces/Notes";
import { Constants } from "./constants";
import { SelectSectionDirectionType } from "../../interfaces/Chart";

export function selectSectionWithDirection(direction: SelectSectionDirectionType) {
  return {
    type: Constants.SELECT_SECTION_WITH_DIRECTION,
    payload: direction,
  }
}
