import { IPages } from '../redux/slices/navigationSlice/NavSlice';

export const usePathСheck = (path: string | undefined, listPages: IPages[]) => {
  let checkPath: Boolean;

  if (!path) {
    checkPath = true;
  } else {
    const pathToLower = path.toLowerCase().replace(/\s+/g, '').toLowerCase();
    checkPath = listPages.some((element) => {
      const titleToLower = element.title.toLowerCase().replace(/\s+/g, '').toLowerCase();
      return titleToLower === pathToLower;
    });
  }

  return { checkPath };
};
