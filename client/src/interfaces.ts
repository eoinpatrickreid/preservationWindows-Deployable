// src/interfaces.ts

export interface Room {
    ref: string;
    roomName: string;
    width: number;
    height: number;
    count: number;
    putty: boolean;
    mastic: boolean;
    masticPatch: boolean;
    paint: boolean;
    tenon: boolean;
    eC: boolean;
    encapsulation: number;
    bottomRail: boolean;
    dormer: boolean;
    easyClean: boolean; // Added field
    pullyWheel: boolean;
    panesNumber: number;
    stainRepairs: number;
    cill: string;
    sash: string;
    notes: string;
    formation: string;
    glassType: string; // Added field
    glassTypeTopBottom: string; // Added field
    casement: boolean;
    outsidePatch: boolean;
    concealedVent: boolean;
    trickleVent: boolean;
    shutters: boolean;
    handles: boolean;
    sashRestrictor: false;
    priceChange: number;
    priceChange2: string;
    positiveNegative: string;
    priceChangeNotes: string;
    customFormation: string;
    customItem: boolean;
    customItemText: string;
    customItem2: number;
    quoteNotes: string;
    windowNotes: string;
    centerMullion: number;
  }
  
  export interface Job {
    _id?: string; // Optional since it will be assigned by MongoDB
    quoteId?: number; // Changed from string to number
    completed: boolean;
    date: string;
    customerName: string;
    address: string;
    email: string;
    phone: string;
    postCode: string;
    rooms: Room[];
    options: string[];
    planningPermission: string; // Add this field
    siteNotes: string; // Add this field
    addressLineOne: string;
    addressLineTwo: string;
    addressLineThree: string;
  }

  export interface Invoice {
    _id?: string; // Optional since it will be assigned by MongoDB
    quoteId?: number; // Changed from string to number
    completed: boolean;
    date: string;
    customerName: string;
    address: string;
    email: string;
    phone: string;
    postCode: string;
    rooms: Room[];
    options: string[];
    planningPermission: string; // Add this field
    siteNotes: string; // Add this field
    addressLineOne: string;
    addressLineTwo: string;
    addressLineThree: string;
  }

  export type Drawing = Job;
  
  export interface Calculations {
    subtotal: number;
    vat: number;
    total: number;
  }
  