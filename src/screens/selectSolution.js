import React, {Component} from 'react';
import {Switch,ScrollView,StyleSheet,Text,View,TouchableOpacity,} from 'react-native';
// import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const solutionList2 =
  'Its easy to tell when a car is overheating. Usually, there is smoking coming from underneath the hood.\nThe first thing one should, as Wheel Scene reports, is to turn off the AC. Instead, switch on the heater. If traffic is busy, donot fear. When reaching a complete stop, switch the gear to neutral and accelerate on the gas pedal.\nThis trick keeps the car running, which is important for ensuring that the radiator is fan keeps spinning. As soon as possible, it is best to pull off to the side of the road and lift up the hood. The driver should wait some time while everything cools down before driving again. ';
const solutionList1 =
  'Jump starting the car for this, you need a jumper cable and a donor car whose battery you will use to charge your car. Place the positive and negative terminals of the jumper cable on the positive and negative terminal of the donor car battery respectively. Then start the donor car and let it run for a few minutes. After some time, your car battery would be charged enough for ignition and once it is done, try the ignition of your car. You’ll be good to go. Want to skip the hassle? Simply book a jumpstart service with GoMechanic and we will handle the situation for you.\nCharging the battery: if you have access to a mechanic in a situation of car battery discharge, then the best thing to do is get the battery removed and the mechanic will put it up on charging so that it can attain all the juice back. These practices can work a couple of times maybe but if your car battery isn’t responding even after trying both the things then you probably want to consider getting a new battery for your car';
const CONTENT = [
  {
    title: 'How to fix Dead Battery issue?',
    content: solutionList1,
  },
  {
    title: 'Overheating Engine Problem',
    content: solutionList2,
  },
  {
    title: 'How ti fix Flat Tire',
    content: solutionList2,
  },
  {
    title: 'Fourth',
    content: solutionList2,
  },
  {
    title: 'Fifth',
    content: solutionList2,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

export default class selectSolution extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: true,
  };

  toggleExpanded = () => {
    this.setState({collapsed: !this.state.collapsed});
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const {multipleSelect, activeSections} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 30}}>
          <Text style={styles.title}>Self Guide</Text>

          {/* <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
            <Switch
              value={multipleSelect}
              onValueChange={a => this.setState({multipleSelect: a})}
            />
          </View> */}

          {/* <View style={styles.selectors}>
            <Text style={styles.selectTitle}>Select:</Text>

            {SELECTORS.map(selector => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}>
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }>
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View> */}

          {/* <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>How to fix Break</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <Text>
                Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                ribs
              </Text>
            </View>
          </Collapsible> */}
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FCFF',
    paddingTop: 55,
    // backgroundColor: 'rgba(255,255,255,1)',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    // color: '#fb5b5a',
    fontSize: 30,
    marginBottom: '15%',
  },
  header: {
    backgroundColor: '#003f5c',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    fontWeight: 'bold',
  },
  headText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',

    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  SignupBtn: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
