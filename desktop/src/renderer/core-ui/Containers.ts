import { styled } from "@twstyled/core";

export const Flex = styled.div`
  @tailwind w-full h-full flex flex-col;
`;

export const FlexLeft = styled.div`
  @tailwind w-full h-full flex flex-col justify-center;
`;

export const FlexRight = styled.div`
  @tailwind w-full h-full flex flex-col justify-center items-end;
`;

export const FlexCenter = styled.div`
  @tailwind w-full h-full flex flex-col justify-center items-center;
`;

export const FlexCenterTop = styled.div`
  @tailwind w-full h-full flex flex-col justify-start items-center;
`;

export const FlexCenterBottom = styled.div`
  @tailwind w-full h-full flex flex-col justify-end items-center;
`;

export const FlexCenterLeft = styled.div`
  @tailwind w-full h-full flex flex-col justify-center items-start;
`;

export const FlexCenterRight = styled.div`
  @tailwind w-full h-full flex flex-col justify-center items-start;
`;
