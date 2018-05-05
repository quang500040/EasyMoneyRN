import { ActionSheetIOS } from "react-native";
import NavigationService from "../routes/NavigationService";

function showMenuAddActivity(navigation) {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Simple Option", "With Image", "With Voice", "Cancel"],
      cancelButtonIndex: 3,
    },
    buttonIndex => {
      if (buttonIndex === 1) {
        NavigationService.navigate("Camera");
      } else if (buttonIndex == 0) {
        NavigationService.navigate("Simple");

      }

    }
  );
}

export default {
  showMenuAddActivity
};
