import styled from "@emotion/styled";
import { viewIcon, heartIcon } from "../assets";

interface PostType {
  authorName: string;
  keyword: string[];
  title: string;
  views: number;
  likes: number;
  imgURL: string;
  onClick?: () => void;
}

const formatCount = (n: number): string => {
  if (n >= 100_000_000) return `${Math.floor(n / 100_000_000)}억`;
  if (n >= 10_000) return `${Math.floor(n / 10_000)}만`;
  return n.toLocaleString();
};

export const Post = ({
  authorName,
  keyword,
  title,
  views,
  likes,
  imgURL,
  onClick,
}: PostType) => {
  return (
    <PostContainer onClick={onClick} imgURL={imgURL}>
      <Overlay>
        <TopLeft>
          <AuthorName>{authorName}님의 게시물</AuthorName>
          <Keywords>
            {keyword.map((kw, i) => (
              <Keyword key={i}>#{kw}</Keyword>
            ))}
          </Keywords>
        </TopLeft>
        <BottomRight>
          <Title>{title}</Title>
          <Stats>
            <StatItem>
              <img src={viewIcon} /> {formatCount(views)}
            </StatItem>
            <StatItem>
              <img src={heartIcon} /> {formatCount(likes)}
            </StatItem>
          </Stats>
        </BottomRight>
      </Overlay>
    </PostContainer>
  );
};

const PostContainer = styled.div<{ imgURL: string }>`
  width: 240px;
  height: 320px;
  border-radius: 20px;
  background-image: url(${({ imgURL }) => imgURL});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover > div {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.151);
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const TopLeft = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: calc(100% - 32px);
`;

const AuthorName = styled.span`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Keyword = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 400;
`;

const BottomRight = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Title = styled.span`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

const Stats = styled.div`
  display: flex;
  gap: 8px;
`;

const StatItem = styled.span`
  color: white;
  font-size: 14px;
`;
