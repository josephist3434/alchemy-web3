import Method from "web3-core-method";

interface PatchParams {
  name: string;
  call: string;
  params: [any];
  inputFormatter: any;
  outputFormatter: any;
}

const MethodFn: any = Method;

export function patchEnableCustomRPC(web3: any): void {
  web3.eth.customRPC = function (opts: PatchParams) {
    /* tslint:disable-next-line */
    const self = this;
    const newMethod = new MethodFn({
      name: opts.name,
      call: opts.call,
      params: opts.params || 0,
      inputFormatter: opts.inputFormatter || null,
      outputFormatter: opts.outputFormatter || null,
    });
    newMethod.attachToObject(self);
    newMethod.setRequestManager(self._requestManager, self.accounts);
  };
}
