export type Gift = {
    id: string;
    body: string;
    title: string;
    prefectures: Prefecture[];
    tell:number;
    business_hours: string;
    url: string;
    address:string;
    image: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  };
  
  export type Prefecture = {
    id: string;
    prefecture_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
  };