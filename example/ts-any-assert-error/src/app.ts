export const useFlowStore = {
  actions: {
    async flowInstantiation(templateId) {
      const res = await (<any>flowInstantiation({
        templateId: templateId,
      }));
    },
  },
};
