import { CMS_NAME, CMS_DESC, CMS_TITLE, CMS_URL, HOME_OG_IMAGE_URL } from "./lib/constants";

export default {  
    title: CMS_TITLE,
    description: CMS_DESC,
    canonical: CMS_URL,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: CMS_URL,
      siteName: CMS_NAME,
      title: CMS_TITLE,
      description: CMS_DESC,
      images: [{ url: HOME_OG_IMAGE_URL }]
    },
    twitter: {
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    },
};

