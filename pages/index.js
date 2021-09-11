import { useAsync } from "react-use";
import * as Masto from "masto";

const Timeline = (props) => {
  const { masto } = props;
  const timeline = useAsync(() =>
    masto.timelines.getTagIterable("mastodon").next()
  );

  if (timeline.loading) {
    return <span>loading the timeline...</span>;
  }

  console.log(timeline);

  return (
    <ul>
      {timeline.value.value.flatMap((status) => (
        <li key={status.id}>
          <p dangerouslySetInnerHTML={{ __html: status.content }} />
        </li>
      ))}
    </ul>
  );
};

export default function Home() {
  const masto = useAsync(() => Masto.login({ url: "https://mastodon.social" }));

  if (masto.loading) {
    return <span>logging into Mastodon...</span>;
  }

  return <Timeline masto={masto.value} />;
}
