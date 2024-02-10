import { writable } from 'svelte/store';

export let files: any = {
    accepted: [],
    rejected: []
};

export const addFile = (e:any) => {
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

export const appStatus = writable(APP_STATUS.CHAT_MODE)
// export const appStatusInfo = writable({id: '1ed1a5680e4b0bd5851b834e1d730ec7', url: 'http://res.cloudinary.com/djdvmcnqc/image/upload/v1707530329/pdf/lzecur1burexkh54jt6w.pdf', pages: 1})

 export const appStatusInfo = writable({id: '16250ebcfcbf4b519e92b55822582ade', url: 'http://res.cloudinary.com/djdvmcnqc/image/upload/v1707532923/pdf/tymyr33zdgoiazbmfyjt.pdf', pages: 4})

export const setAppStatusInit = () => appStatus.set(APP_STATUS.INIT)

export const setAppStatusLoading = () => appStatus.set(APP_STATUS.LOADING)

export const setAppStatusChatMode = (
    { id, url, pages } :
    { id: string, url: string, pages: number }) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
    appStatusInfo.set({ id, url, pages })
  }

export const setAppStatusError = () => appStatus.set(APP_STATUS.ERROR)

