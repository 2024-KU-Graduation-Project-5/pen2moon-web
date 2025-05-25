import { kyClient, multiKyClient } from "./kyClient";

export interface postOCRResponse {
  parsedPdfList: postOCRData[];
}
export interface postOCRData {
  objectList: any[];
  originalImageUrl: string;
  page: number;
}

export interface PDFObject {
  content: {
    confident: number;
    text: string;
  };
  num: string;
  position: { x: number; y: number }[];
}

export interface MyDocument {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

export interface MyDocumentResponse {
  id: number;
  title: string;
  timeStamp: string;
  documentContentList: DocumentContent[];
}
export interface DocumentContent {
  id: number;
  originalImageUrl: string;
  page: number;
  content: string;
}
// Member의 글 목록 조회
export const getMyDocuments = (): Promise<MyDocument[]> =>
  kyClient.get("api/ocr/documents").json();

// PDF 문서변환
export const postOCR = (pdfFile: File): Promise<postOCRResponse> => {
  const formData = new FormData();
  formData.append("pdf", pdfFile);

  return multiKyClient
    .post("api/ocr/documents", {
      body: formData, // json 대신 body 사용
    })
    .json();
};

//글 상세 조회
export const getMyDocument = (id: number): Promise<MyDocumentResponse> =>
  kyClient.get(`api/ocr/documents/${id}`).json();

//글 삭제
export const deleteDocument = (id: number) =>
  kyClient.delete(`api/ocr/documents/${id}`).json();

//테스트
export const getTestLogin = () => kyClient.get(`api/test-login`).json();
