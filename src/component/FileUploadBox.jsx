import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUploadBox({ onFileChange, file }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileChange(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [onFileChange]);
 // 메모리 누수 방지: 컴포넌트 언마운트 시 URL 해제
    useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
 // file prop이 바뀌면 미리보기도 초기화
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
    } else {
      setPreviewUrl(URL.createObjectURL(file));
      // 메모리 누수 방지: 이전 URL revoke
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
    }
    // eslint-disable-next-line
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '1px dashed #b3b3b3',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        background: '#fff',
        minHeight: '200px'
      }}
    >
      <input {...getInputProps()} />
{previewUrl ? (
  <>
    <img
      src={previewUrl}
      alt="미리보기"
      style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 16 }}
    />
    {/* 파일이 첨부된 경우에도 안내문구를 보여주고 싶으면 아래처럼 */}
    {/* <p>파일을 변경하려면 다시 드래그하거나 클릭하세요</p> */}
  </>
) : (
  <>
    <div style={{ color: '#1761fd', fontSize: 48, marginBottom: 16 }}>
      <i className="mdi mdi-cloud-upload-outline"></i>
    </div>
    {isDragActive
      ? <p>Drop the files here ...</p>
      : <p>Drag and drop a file here or click</p>
    }
  </>
)}
    </div>
  );
}

export default FileUploadBox;