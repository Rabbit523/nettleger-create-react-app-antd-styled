import React from 'react';
import Dropzone from 'react-dropzone';
import Notification from '../notification';
import { texts } from '../../constant';

export default function SingleFileAutoSubmit() {
  const getUploadParams = () => {
    return { url: `${process.env.REACT_APP_BACKEND_URL}/api/fileupload` }
  }

  const handleChangeStatus = ({ meta, remove }, status, file) => {
    if (status === 'headers_received') {
      console.log(file);
      Notification({title: texts.notificationSuccess, description: meta.name + " " + texts.notificationSuccessMsg.upload, type: 'success'});
      remove()
    } else if (status === 'aborted') {
      Notification({title: texts.notificationErr, description: meta.name + " " + texts.notificationErrMsg.upload, type: 'error'});
    }
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      styles={{
        dropzone: { width: 400, height: 200 },
        dropzoneActive: { borderColor: 'green' },
      }}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
    />
  );
};
