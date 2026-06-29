import { rkeyFromPath } from "./rkey.js";
const documentStringFields = [
  "title",
  "description",
  "textContent"
];
export const validateAndAddRkey = (docs, publicationUrl, strategy)=>{
  const usedRKeys = {};
  const pubPath = publicationUrl.pathname;
  for (const doc of docs){
    // Basic validation in case people don't typecheck their YAML metadata.
    if (!doc.url) throw Error(`doc.url not found for doc: ${doc.title || JSON.stringify(doc)}`);
    if (!doc.title) throw Error(`doc.title not found for doc "${doc.url}"`);
    if (!doc.publishedAt) throw Error(`doc.publishedAt not found for doc "${doc.url}"`);
    const { pathname } = doc.url;
    const path = pathname.slice(pubPath.length);
    doc.path = !path.startsWith("/") ? "/" + path : path;
    if (!doc.rkey) {
      if (!pathname.startsWith(pubPath)) {
        throw Error(`doc.url path must start with publication.url path (i.e. ${pubPath}), but was ${pathname}`);
      }
      const rkey = rkeyFromPath(pathname, strategy);
      if (!rkey) throw Error(`Couldn't construct rkey for doc ${doc.url}`);
      if (usedRKeys[rkey]) throw Error(`rkey ${rkey} was already used by another document`);
      usedRKeys[rkey] = true;
      doc.rkey = rkey;
    }
  }
  return docs;
};
export const createOrUpdateDocuments = async (agent, docs, publicationAtUri, pubPathChanged)=>{
  const existingDocs = {};
  for (const oldDoc of (await fetchDocuments(agent, publicationAtUri))){
    existingDocs[oldDoc.rkey] = oldDoc;
  }
  for (const newDoc of docs){
    const oldDoc = existingDocs[newDoc.rkey];
    if (!oldDoc) {
      await pushDocument(agent, publicationAtUri, "createRecord", newDoc);
    } else if (pubPathChanged || documentStringFields.some((field)=>oldDoc[field] !== newDoc[field] || oldDoc.publishedAt !== newDoc.publishedAt.toISOString())) {
      await pushDocument(agent, publicationAtUri, "putRecord", newDoc);
    }
  }
};
const fetchDocuments = async (agent, publicationUri)=>{
  const docs = await agent.com.atproto.repo.listRecords({
    repo: agent.did,
    collection: "site.standard.document",
    limit: 100
  });
  return docs.data.records.filter((r)=>r.value.site === publicationUri).map((r)=>({
      ...r.value,
      rkey: r.uri.split("/").pop()
    }));
};
const pushDocument = async (agent, publicationUri, action, doc)=>{
  const res = await agent.com.atproto.repo[action]({
    repo: agent.did,
    collection: "site.standard.document",
    rkey: doc.rkey,
    record: {
      $type: "site.standard.document",
      site: publicationUri,
      title: doc.title,
      publishedAt: doc.publishedAt.toISOString(),
      path: doc.path,
      description: doc.description,
      textContent: doc.textContent
    }
  });
  console.log(`${action === "createRecord" ? "Created" : "Updated"} ${doc.path} ${ansiSetBlue}${res.data.uri}${ansiResetStyles}`);
  return res;
};
const ansiSetBlue = "\x1b[34m";
const ansiResetStyles = "\x1b[0m";
//# sourceMappingURL=document.js.map
