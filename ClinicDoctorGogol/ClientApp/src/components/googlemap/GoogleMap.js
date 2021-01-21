import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../googlemap/GoogleMap.css';

class GoogleMap extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},

        mapCenter: {
            lat: 48.683924,
            lng: 26.587077
        },
        zoomLevel: 15
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <div className='container mt-2'>
                <div className='p-3'>
                    <h5>
                        КОНТАКТНІ ДАНІ:
                        <br />
                        вул. Пушкінська, 38
                        <br />
                        м.Кам'янець-Подільський, Хмельницька область
                        <br />
                        <i className="fas fa-mobile-alt"></i> (096) 896-79-69
                        <br />
                        <i className="fab fa-viber"></i> (063) 883-08-80
                    </h5>
                </div>
                <Map
                    className='wherewe'
                    google={this.props.google}
                    initialCenter={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    center={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    zoom={
                        this.state.zoomLevel
                    }
                // style={{ maxHeight: '400px' }}
                >
                    <Marker onClick={this.onMarkerClick}
                        position={{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }} />
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyD3Eoh-q1If4wL0guQbmP39W8ge90GP_qc')
})(GoogleMap)