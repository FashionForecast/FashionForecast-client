const fs = require('fs');
const branch = process.env.CF_PAGES_BRANCH; // Cloudflare branch

const logo = `# @@@@          @@@@            @@@@@@@@@@
# @@@            @@               @@@@@@@@
# @@                                @@@@@@
# @                                  @@@@@
#                                     @@@@
#                                      @@@
#          @           @@@@@@@          @@
#        @@@@        @@@@@@@@@@@        @@
#        @@@@@      @@@@@@@@@@@@         @
#        @@@@@     @@@@@@   @@@          @
#        @@@@     @@@@                    
#         @@      @@@@                    
#                 @@@                     
#                 @@@                     
# @              @@@@                     
# @@             @@@@                     
# @@@            @@@@                     
# @@@@@          @@@@                     
# @@@@@@@@@       @@@@                    
# @@@@@@@@@       @@@@                    
# @@@@@@@@@@       @@@@@@   @@@          @
# @@@@@@@@@@        @@@@@@@@@@@@         @
# @@@@@@@@@@         @@@@@@@@@@@        @@
# @@@@@@@@@@@          @@@@@@@          @@
# @@@@@@@@@@@@                         @@@
# @@@@@@@@@@@@                        @@@@
# @@@@@@@@@@@@@@                     @@@@@
# @@@@@@@@@@@@@@@                   @@@@@@
# @@@@@@@@@@@@@@@@@               @@@@@@@@
# @@@@@@@@@@@@@@@@@@            @@@@@@@@@@\n\n`;

const production = `User-agent: *
Allow: /
Disallow: /user/
Disallow: /terms-of-service/
Disallow: /privacy-policy/
Sitemap: https://ootc.life/sitemap.xml`;

const robotsContent =
  branch === 'develop' ? `User-agent: *\nDisallow: /` : `${logo}${production}`;

console.log(branch, 'robots.txt 생성중...');

fs.writeFileSync('./public/robots.txt', robotsContent);
