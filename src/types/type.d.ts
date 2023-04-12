import { ReactNode } from "react";
export type MaterialType = 'qrCode' | 'field' | 'logo' | 'customText';

export interface Material {
  type: MaterialType;
  name: string;
  preview: () => JSX.Element;
  renderInstance: FC<props>
  props: Record<string, any>;
}

export interface Block {
  id: number;
  type: MaterialType,
  focus: boolean;
  options: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  props: Record<string, any>;
}

export interface Schema {
  container: {
    width: number;
    height: number;
    top: number;
    left: number;
    scale: number;
  };
  blocks: Block[];
}

export interface MarkLine {
  x: number;
  y: number;
}

export interface DragState {
  startX: number;
  startY: number;
  startTop: number;
  startLeft: number;
  marklineCollection: {
    x: Array<{ showLeft: number, left: number }>
    y: Array<{ showTop: number, top: number }>
  }
}

export interface labelInfo {
  assetInfoId: string;
  qrCodeUrl: string;
  assetLabelFieldList: Array<{
    fieldName: string;
    fieldValue: string;
  }>
}

export interface Label {
  fontSize: number
  labelField: string
  labelHeight: number
  labelWidth: number
  labelType: number
  showField: number
}
