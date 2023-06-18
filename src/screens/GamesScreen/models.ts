import {GameModel} from '../../models/GameModel';

export interface FlatlistGameCardModel {
  item: GameModel;
}

export interface SearchBarModel {
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  value: string;
  setShowMenuSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DrawerMenuModel {
  setShowMenuSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  showMenuSideBar: boolean;
  setFilterBtnIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  filterBtnIsClicked: boolean;
  setCheckPlatform: React.Dispatch<
    React.SetStateAction<'all' | 'browser' | 'pc'>
  >;
  checkPlatform: 'all' | 'browser' | 'pc';
  setSortBy: React.Dispatch<
    React.SetStateAction<
      'release-date' | 'title' | 'popularity' | 'alphabetical' | undefined
    >
  >;
  category: string[] | undefined;

  setCategory: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  sortBy: 'release-date' | 'title' | 'popularity' | 'alphabetical' | undefined;
}

export interface CheckBoxComponentModel {
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  checkBox: boolean;
  text: string;
}
