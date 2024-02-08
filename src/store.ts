import { writable } from 'svelte/store';

export let files = {
    accepted: [],
    rejected: []
};

export const addFile = (e) => {
    const { acceptedFiles, fileRejections } = e.detail;
    console.log(acceptedFiles);
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    console.log("Archivos: " + files.accepted.length);
};

export const deleteFile = () => {
    console.log(files.accepted)
    files.accepted.length = 0
    console.log("Archivos: " + files.accepted.length);
    setAppStatusInit()
};

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1
}

export const appStatus = writable(APP_STATUS.INIT)

export const setAppStatusInit = () => appStatus.set(APP_STATUS.INIT)

export const setAppStatusLoading = () => appStatus.set(APP_STATUS.LOADING)

export const setAppStatusChatMode = () => appStatus.set(APP_STATUS.CHAT_MODE)

export const setAppStatusError = () => appStatus.set(APP_STATUS.ERROR)

