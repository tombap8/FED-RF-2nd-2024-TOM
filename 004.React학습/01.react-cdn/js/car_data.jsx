// 자동차 정보파일 /////
const carInfo = {
  기아레이: [
    {
      color: "라잇블루",
      model: "2023년형",
      opt: { filter: "hue-rotate(0deg)" },
    },
    {
      color: "럭셔리와인",
      model: "2025년형",
      opt: {
        filter: "hue-rotate(109deg)",
        transform: "rotateY(180deg)",
      },
    },
    {
      color: "녹차그린",
      model: "2024년형",
      opt: { filter: "hue-rotate(215deg)" },
    },
  ],
  현대제네시스: [
    {
      color: "스틸그레이",
      model: "2024년형",
      opt: { filter: "grayscale(1)" },
    },
    {
      color: "세단핑크",
      model: "2025년형",
      opt: {
        filter: "hue-rotate(109deg)",
        transform: "rotateY(180deg)",
      },
    },
    {
      color: "라잇그린",
      model: "2024년형",
      opt: { filter: "hue-rotate(215deg)" },
    },
  ],
};

const carImage = {
  기아레이: "ray.png",
  현대제네시스: "genesis.png",
};

export { carInfo, carImage };
