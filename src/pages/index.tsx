import Link from "next/link";
import type { InferGetStaticPropsType, NextPage } from "next";//後で調べる
import { client } from "libs/client";    // srcから見た絶対パスで指定
import type { Gift, Tag } from "types/gift";    // srcから見た絶対パスで指定

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const gifts = await client.get({ endpoint: "gifts" });
  const tags = await client.get({ endpoint: "tags" });

  return {
    props: {
      gifts: gifts.contents,
      tags: tags.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  gifts: Gift[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  gifts,
  tags,
}: Props) => {
  // console.log(gifts)
  // console.log(tags)
  return (
    <div>
      <ul>
        {gifts.map((gift) => (
          <li key={gift.id}>
            <Link href={`/gift/${gift.id}`}>
              {gift.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home;
