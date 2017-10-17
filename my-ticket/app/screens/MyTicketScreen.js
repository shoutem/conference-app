import React, {
  Component,
} from 'react';

import { connect } from 'react-redux';

import {
  Screen,
  View,
  Image,
  Text,
  Button,
  Subtitle,
  Caption,
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import { scanQRCode } from 'shoutem.camera';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundGradient: {
      colors: ['#ff573b', '#ff914a'],
      start: { x: 0.0, y: 1.0 },
      end: { x: 1.0, y: 0.0 },
      locations: [0, 1],
    },
  },
  scanTicketContainer: {
    alignItems: 'center',
  },
  scanTicketBarcode: {
    marginTop: 150,
    marginBottom: 50,
    width: 276,
    height: 150,
  },
  scanTicketButton: {
    width: 200,
  },
  scanTicketMessage: {
    textAlign: 'center',
    paddingVertical: 75,
    paddingHorizontal: 55,
    lineHeight: 26,
    color: 'white',
  },
  ticketContainer: {
    alignItems: 'center',
  },
  ticketBackground: {
    width: 285,
    height: 425,
    justifyContent: 'flex-start',
  },
  ticketLogo: {
    width: 202,
    height: 61,
    marginTop: 90,
  },
};

export class MyTicketScreen extends Component {
  state = { ticket: null }

  handleScanTicketPress() {
    this.props.scanQRCode(
      code => this.handleQRCode(code),
      'Scan your ticket'
    );
  }

  handleQRCode(code) {
    const ticket = JSON.parse(code);
    this.setState({ ticket });
  }

  renderScanTicketView() {
    return (
      <View style={styles.scanTicketContainer}>
        <Image
          style={styles.scanTicketBarcode}
          source={require('../assets/barcode.png')}
        />
        <Button
          style={styles.scanTicketButton}
          onPress={() => this.handleScanTicketPress()}
        >
          <Text>SCAN YOUR TICKET</Text>
        </Button>
        <Text style={styles.scanTicketMessage}>
          Scan the code on the ticket you’ve purchased.
          Don’t forget to carry your ticket with you at all times.
        </Text>
      </View>
    );
  }

  renderTicketView() {
    const { ticket } = this.state;
    return (
      <View style={styles.ticketContainer}>
        <Image
          style={styles.ticketBackground}
          source={require('../assets/ticket-background.png')}
        >
          <Image
            style={styles.ticketLogo}
            source={require('../assets/ticket-logo.png')}
          />
          <Subtitle styleName="xl-gutter-top">{ticket.firstName.toUpperCase()} {ticket.lastName.toUpperCase()}</Subtitle>
          <Caption styleName="sm-gutter-top">{ticket.role.toUpperCase()}</Caption>
        </Image>
      </View>
    );
  }

  render() {
    const { ticket } = this.state;
    const mainView = ticket ?
      this.renderTicketView() :
      this.renderScanTicketView();

    return (
      <Screen styleName="full-screen">
        <NavigationBar styleName="clear" />
        <View style={styles.container}>
          {mainView}
        </View>
      </Screen>
    );
  }
}

export default connect(undefined, { scanQRCode })(MyTicketScreen);
