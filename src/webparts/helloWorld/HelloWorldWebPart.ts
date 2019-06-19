import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import {ColorPickerControlProperty} from '../../controls/ColorPicker/ColorPickerControlProperty';
import { update } from "@microsoft/sp-lodash-subset";

export interface IHelloWorldWebPartProps {
  description: string;
  color: string;
  onColorChanged: (color: string) => void;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps > = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        color: this.properties.color
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onColorChange(color: any) {
    update(
      this.properties,
      "color",
      (): any => {
        return color;
      }
    );
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                new ColorPickerControlProperty("color", {
                  key: "COLOR PICKER",
                  label: "COLOR PICKER",
                  color: this.properties.color,
                  onColorChanged: this.onColorChange.bind(this),
                  onRender: this.render.bind(this)
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
