import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { getGroups } from '../../store/actions/overall.predictions';
import GroupCards from '../../components/groupCards/groupCards';

import './overallPrediction.css';

const mapStateToProps = (state) => ({
  groups: state.prediction.data.groups
});

const mapDispatchToProps = (dispatch) => ({
  getGroups: () => dispatch(getGroups())
});

class OverallPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: props.groups
    };
  }
  componentWillMount() {
    if(this.state.groups.length === 0) {
      this.props.getGroups();
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      groups: newProps.groups
    });
  }
  render() {
    const { groups } = this.state;
    const GroupContent = groups.length === 0 
      ? <p>No groups</p> 
      : groups.map((groupItem, id) => <GroupCards info={groupItem} key={`group-${id}`}/>);
    return (
      <section className="prediction-wrapper">
        <SwipeableViews className="groups-container">
          {GroupContent}
        </SwipeableViews>
        <footer className="confirmation-wrapper"></footer>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverallPrediction);