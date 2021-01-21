import React, { Component } from 'react';
import './index.scss';
import { ProgressSpinner } from "primereact/progressspinner";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";

class EclipseWidgetContainer extends Component {
    render() {
        return (
            <div className="my_eclipse" id="dlgProgress">
                <ProgressSpinner
                    style={{ width: "50px", height: "50px" }}
                    strokeWidth="5"
                    fill="#EEEEEE"
                    animationDuration=".5s"
                />
            </div>
        );
    }
}
const EclipseWidget = (EclipseWidgetContainer);
export default EclipseWidget;