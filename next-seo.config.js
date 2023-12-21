import { CMS_NAME, CMS_DESC, CMS_TITLE, CMS_URL } from "./lib/constants";

export default {
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: CMS_URL,
      siteName: CMS_NAME,
      title: CMS_TITLE,
      description: CMS_DESC
    },
    twitter: {
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    },
};

