import { MacetoHuertoAppPage } from './app.po';

describe('maceto-huerto-app App', function() {
  let page: MacetoHuertoAppPage;

  beforeEach(() => {
    page = new MacetoHuertoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
