import ColorThief from 'colorthief';
import { neededFieldsFromApiType, COLOR_TYPES } from '../';

const nonePhotoURL = 'https://e-kolosok.org/wp-content/uploads/2019/07/none.png';

export const getNeededFieldsFromApiResponse = (apiResponse: any[]): neededFieldsFromApiType[] =>
  apiResponse.map((object) => ({
    objectID: object.objectID,
    primaryImageSmall: object.primaryImageSmall ? object.primaryImageSmall : nonePhotoURL,
  }));

export const getInfoFromImage = (preparedArrayOfObjects: neededFieldsFromApiType[]) =>
  Promise.all(
    preparedArrayOfObjects.map((object) =>
      ColorThief.getColor(object.primaryImageSmall).then((color: any) => {
        const isMonochromaticImages = [...new Set(color)].length === 1;
        const dominantPrimaryColorIndex = isMonochromaticImages
          ? 3
          : color.reduce(
              (acc, value, index) => {
                if (acc.value < value) {
                  acc.value = value;
                  acc.index = index;
                }

                return acc;
              },
              { value: 0, index: 0 },
            ).index;

        return {
          ...object,
          dominantColor: `rgb(${color.join(',')})`,
          dominantPrimaryColor: COLOR_TYPES[dominantPrimaryColorIndex],
        };
      }),
    ),
  );
