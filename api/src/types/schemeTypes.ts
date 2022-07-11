import {Date, Types} from 'mongoose';

interface IImage {
    data: Buffer;
    contentType: string;
}

interface ILabelAlbum {
    label: Types.ObjectId;
    catalogNumber: string;
}

interface ITrack {
    number: string;
    title: string;
    duration?: string;
}

interface ICredit {
    musician: Types.ObjectId;
    instruments: [string];
    tracks?: [string];
}

interface IUser {
    username: string;
    password: string;
    email: string;
    realName?: string;
    profile?: string;
    ubication?: string;
    website?: string;
    image?: IImage;
    albumsPosted?: [Types.ObjectId];
    artistsPosted?: [Types.ObjectId];
    labelsPosted?: [Types.ObjectId];
    albumsOwned?: [Types.ObjectId];
    albumsWished?: [Types.ObjectId];
    isAdmin: boolean;
}

interface IAlbum {
    name: string;
    artists: [Types.ObjectId];
    labels: [ILabelAlbum];
    format: Types.ObjectId;
    formatEditors?: [Types.ObjectId];
    country?: string;
    date?: Date;
    tracks: [ITrack];
    credits?: [ICredit];
    genres: [Types.ObjectId];
    styles?: [Types.ObjectId];
    notes: string;
    images?: [IImage];
    isMaster: boolean;
    master: Types.ObjectId;
    postedBy: [Types.ObjectId];
    ownedBy?: [Types.ObjectId];
    wishedBy?: [Types.ObjectId];
}

interface IArtist {
    name: string;
    realName?: string;
    profile?: string;
    websites?: [string];
    nicknames?: [Types.ObjectId];
    groups?: [Types.ObjectId];
    members?: [Types.ObjectId];
    albums?: [Types.ObjectId];
    credits?: [Types.ObjectId];
}

interface ILabel {
    name: string;
    profile?: string;
    subLabels?: [Types.ObjectId];
    parentLabel?: Types.ObjectId;
    contactInformation?: string;
    websites?: [string];
    albums: [Types.ObjectId];
}

interface IGenre {
    name: string;
    description?: string,
}

interface IStyle {
    name: string;
    description?: string;
}

export {IUser, IAlbum, IArtist, ILabel, IGenre, IStyle}