import * as React from "react";
import { ColorPicker } from "office-ui-fabric-react/lib/components/ColorPicker";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import { createRef } from "office-ui-fabric-react/lib/Utilities";

export interface IColorPickerControlProps {
  label: string;
  color: string;
  onColorChanged: (color: string) => void;
}

export interface IColorPickerControlState {
  color: string;
  isCalloutVisible: boolean;
  value: boolean;
}

export default class ColorPickerControl extends React.Component<
IColorPickerControlProps,
IColorPickerControlState
> {
  private menuButtonElement = createRef<HTMLElement>();

  constructor(props: IColorPickerControlProps) {
    super(props);
    //Bind the current object to the external called method
    this.backgroundColorChanged = this.backgroundColorChanged.bind(this);
    this.setCalloutVisible = this.setCalloutVisible.bind(this);
    this.dismissCallout = this.dismissCallout.bind(this);
    //Inits the state

    this.state = {
      color: props.color,
      isCalloutVisible: false,
      value: false
    };
  }

  //handles color change for backgroundColor
  public backgroundColorChanged(color: string) {
    this.props.onColorChanged(color);
    this.setState({
      color
    });
  }

  //handles state change to display  or hide callout of picker
  public setCalloutVisible() {
    this.setState({
      isCalloutVisible: true
    });
  }

  public dismissCallout() {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  public render(): React.ReactElement<IColorPickerControlProps> {
    const miniButtonStyle = {
      width: "40px",
      height: "20px",
      padding: "6px",
      backgroundColor: this.state.color,
      borderRadius: "5px",
      boxShadow: "2px 2px 2px black"
    };

    //Renders content
    return (
      <div>
        <label style={{ fontWeight: 600 }}>{this.props.label}</label>
        <div
          ref={this.menuButtonElement}
          style={miniButtonStyle}
          onClick={this.setCalloutVisible}
          id="colorpicker"
        />
        {this.state.isCalloutVisible && (
          <Callout
            className={"ms-CalloutExample-callout"}
            gapSpace={0}
            target={this.menuButtonElement.value}
            setInitialFocus={true}
            hidden={!this.state.isCalloutVisible}
            onDismiss={this.dismissCallout}
          >
            <ColorPicker
              color={this.state.color}
              onColorChanged={e => this.backgroundColorChanged(e)}
              alphaSliderHidden={true}
            />
          </Callout>
        )}
      </div>
    );
  }
}
