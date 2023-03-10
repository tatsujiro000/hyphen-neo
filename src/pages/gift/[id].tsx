import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
    NextPage,
  } from "next";//後で調べる
  import { client } from "libs/client";
  import type { Gift } from "types/gift";
  
  // APIリクエストを行うパスを指定
  export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const data = await client.get({ endpoint: "gifts" });
    console.log("data", data)
  
    const paths = data.contents.map((content) => `/gift/${content.id}`);
    return { paths, fallback: false };//後で調べる
  };
  
  
  // microCMSへAPIリクエスト
  export const getStaticProps: GetStaticProps<Props, Params> = async (context) =>{

    const id = context.params?.id;
    const data = await client.get({ endpoint: "gifts", contentId: id });
  
    return {
      props: {
        gift: data,
      },
    };
  };
  
  // Props（gift）の型
  type Props = {
    gift: Gift;
  };
  
  const GiftId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({//後で調べる
    gift,
  }: Props) => {
    return (
      <main>
        <h1>{gift.title}</h1>
        <p>{gift.publishedAt}</p>
              {gift.prefectures.map((prefecture) => (
          <li key={prefecture.id}>
            #{prefecture.prefecture_name}
          </li>
        ))}
        <div>
          <p>電話番号：{gift.tell}</p>
          <p>営業時間：{gift.business_hours}</p>
          <p>サイトurl：{gift.url}</p>
          <p>住所：{gift.address}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${gift.body}`,
          }}
        />
      </main>
    );
  }

export default GiftId;