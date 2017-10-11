'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
  chevron: {
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: width/6,
    zIndex: 10,
    top: 0
  },
  left_chevron: {
    left: 0
  },
  right_chevron: {
    right: 0
  },
  chevron_wrapper: {
    backgroundColor: 'rgba(245, 245, 245, 0.3)',
    width: 50,
    height: 50,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center'
  },
  previous_icon: {
    fontSize: 30,
    color: '#0000FF'
  },
  next_icon: {
    fontSize: 30,
    color: '#0000FF'
  }
}

const sliderValue = 0;

export default class extends Component {

  constructor(props) {
    super(props);

    sliderValue = 0;
    this.state = {
      sliderValue: 0
    };
  }

  static propTypes = {
    images: PropTypes.array.isRequired,
    previousIconName: PropTypes.string,
    nextIconName: PropTypes.string,
    
    onIndexChanged: PropTypes.func,

    chevronStyle: View.propTypes.style,
    chevronLeftStyle: View.propTypes.style,
    chevronRightStyle: View.propTypes.style,
    chevronWrapperStyle: View.propTypes.style,

    previousIconStyle: View.propTypes.style,
    nextIconStyle: View.propTypes.style
  };

  static defaultProps = {
    previousIconName: 'ios-arrow-back',
    nextIconName: 'ios-arrow-forward',

    onIndexChanged: () => null
  };

  sliderSlide(index){
    var scrollValue = width * index;
    sliderValue = index;
    this._scrollView.scrollTo({ x: scrollValue, animated: true});
  }

  render () {

    let { images } = this.props;

    return (
      <View>
        {
          this.state.sliderValue != 0 ?
            <TouchableOpacity style={[styles.chevron, this.props.chevronStyle, styles.left_chevron, this.props.chevronLeftStyle]} onPress={() => {this.sliderSlide(sliderValue == 0 ? 0 : sliderValue - 1)}}>
              <View style={[styles.chevron_wrapper, this.props.chevronWrapperStyle]}>
                <Text allowFontScaling={false} style={[styles.previous_icon, this.props.previousIconStyle]}>‹</Text>
              </View>
            </TouchableOpacity>
          :
            <View></View>
        }
        {
          this.state.sliderValue != images.length-1 ?
            <TouchableOpacity style={[styles.chevron, this.props.chevronStyle, styles.right_chevron, this.props.chevronRightStyle]} onPress={() => {this.sliderSlide(sliderValue == images.length ? images.length : sliderValue + 1)}}>
              <View style={[styles.chevron_wrapper, this.props.chevronWrapperStyle]}>
                <Text allowFontScaling={false} style={[styles.previous_icon, this.props.previousIconStyle]}>›</Text>
              </View>
            </TouchableOpacity>
          :
            <View></View>
        }
        <ScrollView
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={
            (obj)=>{
              sliderValue = parseInt(obj.nativeEvent.contentOffset.x/width);
              this.setState({sliderValue});
            }}
          ref={view => this._scrollView = view}>
          {
            images.map((image, index)=>{
              return (
                <View  key={index} style={{position:'relative'}}>
                  <View>
                    <Image source={{uri: image }} style={{width:width,height:300}}/>
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    )
  }
}