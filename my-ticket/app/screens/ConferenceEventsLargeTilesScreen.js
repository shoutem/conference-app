import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { connectStyle } from '@shoutem/theme';
import {
  View,
  Button,
  TouchableOpacity,
  Tile,
  Title,
  Caption,
  Icon,
  Divider,
  Image,
} from '@shoutem/ui';

import { currentLocation } from 'shoutem.cms';
import {
  EventsScreen,
  mapStateToProps,
  mapDispatchToProps,
} from 'shoutem.events/screens/EventsScreen';

import { ext } from '../const';

export class ConferenceEventsLargeTilesScreen extends EventsScreen {
  static propTypes = {
    ...EventsScreen.propTypes,
  };

  renderRow(event) {
    return (
      <View styleName="flexible sm-gutter-bottom" key={event.id}>
        <TouchableOpacity
          onPress={() => this.openDetailsScreen(event)}
        >
          <Tile>
            <Image
              styleName="large-banner"
              source={{ uri: _.get(event, 'image.url') }}
            />
            <View styleName="content">
              <Title>{event.name}</Title>
              <View styleName="horizontal space-between">
                <Caption>{moment(event.startTime, 'YYYY-MM-DDThh:mm:ssZ').format('YYYY/MM/DD')}</Caption>
                <Button
                  styleName="tight clear"
                  onPress={this.addToCalendar}
                >
                  <Icon name="add-event" />
                </Button>
              </View>
            </View>
          </Tile>
          <Divider styleName="line" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('ConferenceEventsLargeTilesScreen'))(currentLocation(ConferenceEventsLargeTilesScreen)),
);
