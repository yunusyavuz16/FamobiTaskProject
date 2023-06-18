import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {delay} from '../../helpers/DelayHelpers/DelayHelper';
import {RequestHelper} from '../../helpers/RequestHelpers/RequestHelper';
import FilterSvg from '../../images/svgs/FilterSvg';
import SearchSvg from '../../images/svgs/SeachSvg';
import SettingAnolog from '../../images/svgs/SettingAnolog';
import {GameModel} from '../../models/GameModel';
import GameCard from './components/GameCard';
import {DrawerMenuModel, SearchBarModel} from './models';
import {GameScreenStyles} from './styles';

const GamesScreen = () => {
  const [gameData, setGameData] = React.useState<GameModel[]>([]);
  const [searchInput, setSearchInput] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showMenuSideBar, setShowMenuSideBar] = React.useState<boolean>(false);
  const [filterBtnIsClicked, setFilterBtnIsClicked] =
    React.useState<boolean>(false);
  const [category, setCategory] = React.useState<string[]>();
  const [checkPlatform, setCheckPlatform] = React.useState<
    'all' | 'browser' | 'pc'
  >('all');

  const [sortBy, setSortBy] = React.useState<
    'release-date' | 'title' | 'popularity' | 'alphabetical' | undefined
  >();

  React.useEffect(() => {
    getGameData();
  }, []);

  React.useEffect(() => {
    if (filterBtnIsClicked) {
      clickFilterBtn();
    }
  }, [filterBtnIsClicked]);

  const clickFilterBtn = async () => {
    await delay(500);
    getGameData();
    setFilterBtnIsClicked(false);
  };

  const getGameData = async () => {
    setLoading(true);
    await delay(500);
    let url = 'https://www.freetogame.com/api/games';
    if (category && category.length > 0) {
      url = 'https://www.freetogame.com/api/filter?tag=';
      category.forEach((element, index) => {
        if (index === 0) {
          url = url + element;
        } else {
          url = url + '.' + element;
        }
      });

      if (checkPlatform !== 'all') {
        url = url + `&platform=${checkPlatform}`;
      }
      if (sortBy) {
        url = url + `&sort-by=${sortBy}`;
      }
    } else {
      if (checkPlatform !== 'all' || sortBy) {
        url = url + '?';
      }
      if (checkPlatform !== 'all') {
        url = url + `platform=${checkPlatform}`;
      }
      if (sortBy) {
        url = url + `&sort-by=${sortBy}`;
      }
    }
    const res = await RequestHelper(url);

    if (res.error) {
      Alert.alert('Error', res.errorMessage);
      setGameData([]);
    } else {
      setGameData(res.data);
    }
    setLoading(false);
  };

  const manipulateData = () => {
    let data = [...gameData];
    if (searchInput) {
      data = data.filter(
        item =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.platform.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }
    return data;
  };

  return (
    <View style={GameScreenStyles.container}>
      <HeaderComponent />
      {/* start region search bar */}
      <SearchBar
        setSearchInput={setSearchInput}
        setShowMenuSideBar={setShowMenuSideBar}
        value={searchInput ?? ''}
      />
      {/* end region search bar */}
      {/* start redion drawer menu */}

      <DrawerMenu
        filterBtnIsClicked={filterBtnIsClicked}
        setFilterBtnIsClicked={setFilterBtnIsClicked}
        checkPlatform={checkPlatform}
        setCheckPlatform={setCheckPlatform}
        setCategory={setCategory}
        category={category}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setShowMenuSideBar={setShowMenuSideBar}
        showMenuSideBar={showMenuSideBar}
      />

      {loading && (
        <View style={GameScreenStyles.loadingText}>
          <Text>Your Game Data is Loading... </Text>
          <ActivityIndicator color={'black'} />
        </View>
      )}
      <FlatList
        onRefresh={getGameData}
        refreshing={loading}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        keyExtractor={item => item.id.toString()}
        data={manipulateData()}
        renderItem={({item}) => {
          return <GameCard item={item} />;
        }}
      />
    </View>
  );
};

const SearchBar: React.FC<SearchBarModel> = props => {
  const {value, setSearchInput, setShowMenuSideBar} = props;
  return (
    <View style={GameScreenStyles.searchInnerContainer}>
      <View>
        <SearchSvg />
      </View>
      <TextInput
        style={GameScreenStyles.searchBar}
        placeholder={'Search a game...'}
        value={value}
        onChangeText={val => setSearchInput(val)}
        placeholderTextColor={'grey'}
      />
      <TouchableOpacity
        onPress={() => {
          setShowMenuSideBar(true);
          Keyboard.dismiss();
        }}
        style={GameScreenStyles.settingSvg}>
        <SettingAnolog />
      </TouchableOpacity>
    </View>
  );
};

const PLATFORMS = ['all', 'browser', 'pc'];
const CATEGORIES = [
  'mmorpg',
  'shooter',
  'strategy',
  'action',
  'racing',
  'sports',
  'mmo',
  'survival',
  'social',
];

const SORTBY = ['release-date', 'title', 'popularity', 'alphabetical'];

const DrawerMenu: React.FC<DrawerMenuModel> = props => {
  const {
    showMenuSideBar,
    setShowMenuSideBar,
    category,
    checkPlatform,
    setCategory,
    setCheckPlatform,
    setSortBy,
    filterBtnIsClicked,
    setFilterBtnIsClicked,
    sortBy,
  } = props;
  const [rightPosition] = React.useState(new Animated.Value(0));

  const mooveLR = async () => {
    Animated.timing(rightPosition, {
      useNativeDriver: false,
      toValue: -225,
      duration: 375,
      easing: Easing.linear,
    }).start();
    await delay(375);
    setShowMenuSideBar(false);
  };

  const mooveRL = () => {
    Animated.timing(rightPosition, {
      useNativeDriver: false,
      toValue: 0,
      duration: 375,
      easing: Easing.linear,
    }).start();
  };

  function checkboxHandler(element: string) {
    let oldValues: any[] = category ? [...category] : [];

    if (oldValues.includes(element)) {
      oldValues = oldValues.filter(x => x !== element);
    } else {
      oldValues.push(element);
    }

    setCategory(oldValues.length > 0 ? oldValues : undefined);
  }
  React.useEffect(() => {
    if (showMenuSideBar) {
      mooveRL();
    }
  }, [showMenuSideBar]);

  return (
    <>
      {showMenuSideBar && (
        <>
          <TouchableOpacity
            style={GameScreenStyles.drawerOuterContainer}
            onPress={mooveLR}></TouchableOpacity>
          <Animated.View
            style={[GameScreenStyles.innerDrawer, {right: rightPosition}]}>
            {/* header height 60 */}
            <View style={GameScreenStyles.innerHeader}>
              <FilterSvg />
              <Text style={GameScreenStyles.filterText}>Filtre</Text>
              <TouchableOpacity
                onPress={mooveLR}
                style={GameScreenStyles.closeBtn}>
                <Text style={GameScreenStyles.closeText}>X</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{flex: 1}}>
              <View style={[GameScreenStyles.filterInnerContainer]}>
                <Text style={GameScreenStyles.filterSubHeader}>
                  Filter By Category
                </Text>
                {PLATFORMS.map(element => (
                  <TouchableOpacity
                    key={element}
                    style={GameScreenStyles.radioBtnRow}
                    onPress={() =>
                      setCheckPlatform(element as 'all' | 'browser' | 'pc')
                    }>
                    <View style={GameScreenStyles.radioIcon}>
                      {checkPlatform === element && (
                        <View style={GameScreenStyles.radioiconinside}></View>
                      )}
                    </View>
                    <Text
                      style={
                        checkPlatform === element
                          ? GameScreenStyles.checkedboxLabel
                          : GameScreenStyles.checkboxLabel
                      }>
                      {element}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[GameScreenStyles.filterInnerContainer]}>
                <Text style={GameScreenStyles.filterSubHeader}>
                  Filter By Platform
                </Text>
                {CATEGORIES.map(element => (
                  <TouchableOpacity
                    key={element}
                    onPress={() => checkboxHandler(element)}
                    style={GameScreenStyles.checkboxRow}>
                    <View style={GameScreenStyles.checkICon}>
                      {category?.includes(element) && (
                        <View style={GameScreenStyles.checkinside}></View>
                      )}
                    </View>
                    <Text
                      style={
                        category?.includes(element)
                          ? GameScreenStyles.checkedboxLabelcheck
                          : GameScreenStyles.checkboxLabelcheck
                      }>
                      {element}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[GameScreenStyles.filterInnerContainer]}>
                <Text style={GameScreenStyles.filterSubHeader}>Sort By</Text>
                {SORTBY.map(element => (
                  <TouchableOpacity
                    key={element}
                    style={GameScreenStyles.radioBtnRow}
                    onPress={() =>
                      setSortBy(
                        element as
                          | 'release-date'
                          | 'title'
                          | 'popularity'
                          | 'alphabetical',
                      )
                    }>
                    <View style={GameScreenStyles.radioIcon}>
                      {sortBy === element && (
                        <View style={GameScreenStyles.radioiconinside}></View>
                      )}
                    </View>
                    <Text
                      style={
                        sortBy === element
                          ? GameScreenStyles.checkedboxLabel
                          : GameScreenStyles.checkboxLabel
                      }>
                      {element}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              disabled={filterBtnIsClicked}
              onPress={() => setFilterBtnIsClicked(true)}
              style={
                !filterBtnIsClicked
                  ? GameScreenStyles.filterBtn
                  : [
                      GameScreenStyles.filterBtn,
                      {backgroundColor: 'rgba(85,124,230,0.5)'},
                    ]
              }>
              {filterBtnIsClicked ? (
                <Text style={{color: 'white'}}>Loading...</Text>
              ) : (
                <Text style={{color: 'white'}}>Filter</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default GamesScreen;
