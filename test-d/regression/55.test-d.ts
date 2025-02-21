// https://github.com/wikimedia-gadgets/types-mediawiki/issues/55
import { ApiUploadParams } from "../../api_params";

const params: ApiUploadParams = {};
new mw.Api().ajax(params);
