<!-- eslint-disable no-mixed-spaces-and-tabs -->
<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <main class="container overflow-auto pl-8 pt-8">
    <div class="intro">
      <h1 class="mb-2 text-4xl font-bold">
        Third Party Licenses
      </h1>
      <p class="mb-4">
        This page lists the licenses of the projects used in kanri.
      </p>
    </div>

    <h2 class="text-lg italic">
      Overview of licenses:
    </h2>
    <ul class="licenses-overview mb-8">
      <li><a href="#MIT">MIT License</a> (47)</li>
      <li><a href="#Apache-2.0">Apache License 2.0</a> (38)</li>
      <li><a href="#BSD-3-Clause">BSD 3-Clause &quot;New&quot; or &quot;Revised&quot; License</a> (4)</li>
      <li><a href="#MPL-2.0">Mozilla Public License 2.0</a> (3)</li>
      <li><a href="#CC0-1.0">Creative Commons Zero v1.0 Universal</a> (1)</li>
      <li><a href="#Unicode-DFS-2016">Unicode License Agreement - Data Files and Software (2016)</a> (1)</li>
    </ul>

    <h2 class="text-lg italic">
      All license text:
    </h2>
    <ul class="licenses-list">
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://crates.io/crates/tauri-plugin-autostart ">tauri-plugin-autostart 0.1.0</a></li>
          <li><a href=" https://crates.io/crates/tauri-plugin-store ">tauri-plugin-store 0.1.0</a></li>
        </ul>
        <pre class="license-text">
                                     Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS</pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Frommi/miniz_oxide/tree/master/miniz_oxide ">miniz_oxide 0.6.2</a></li>
          <li><a href=" https://github.com/taiki-e/pin-project-lite ">pin-project-lite 0.2.9</a></li>
          <li><a href=" https://github.com/rust-windowing/raw-window-handle ">raw-window-handle 0.5.0</a></li>
          <li><a href=" https://github.com/tauri-apps/tauri ">tauri 1.2.4</a></li>
          <li><a href=" https://github.com/tauri-apps/tauri/tree/dev/core/tauri-build ">tauri-build 1.2.1</a></li>
          <li>
            <a href=" https://github.com/tauri-apps/tauri/tree/dev/core/tauri-codegen ">tauri-codegen 1.2.1</a>
          </li>
          <li><a href=" https://github.com/tauri-apps/tauri ">tauri-macros 1.2.1</a></li>
          <li><a href=" https://github.com/tauri-apps/tauri ">tauri-runtime 0.12.1</a></li>
          <li><a href=" https://github.com/tauri-apps/tauri ">tauri-runtime-wry 0.12.2</a></li>
          <li><a href=" https://github.com/tauri-apps/tauri ">tauri-utils 1.2.1</a></li>
        </ul>
        <pre class="license-text">
                                     Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/time-rs/time ">time 0.3.17</a></li>
          <li><a href=" https://github.com/time-rs/time ">time-core 0.1.0</a></li>
        </ul>
        <pre class="license-text">
                                     Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright 2022 Jacob Pratt et al.

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/nvzqz/embed-plist-rs ">embed_plist 1.2.2</a></li>
          <li><a href=" https://github.com/hsivonen/encoding_rs ">encoding_rs 0.8.31</a></li>
          <li><a href=" https://bitbucket.org/marshallpierce/line-wrap-rs/src ">line-wrap 0.1.1</a></li>
        </ul>
        <pre class="license-text">
                                     Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright [yyyy] [name of copyright owner]

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Lokathor/tinyvec ">tinyvec 1.6.0</a></li>
        </ul>
        <pre class="license-text">
                                     Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright [yyyy] [name of copyright owner]

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/microsoft/windows-rs ">windows 0.37.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows-sys 0.42.0</a></li>
        </ul>
        <pre class="license-text">                                 Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright (c) Microsoft Corporation.

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/dtolnay/ryu ">ryu 1.0.12</a></li>
          <li>
            <a href=" https://github.com/chippers/serialize-to-javascript ">serialize-to-javascript 0.1.1</a>
          </li>
          <li>
            <a href=" https://github.com/chippers/serialize-to-javascript ">serialize-to-javascript-impl
              0.1.1</a>
          </li>
          <li>
            <a href=" https://github.com/tauri-apps/tauri-plugin-persisted-scope ">tauri-plugin-persisted-scope
              0.1.0</a>
          </li>
        </ul>
        <pre class="license-text">                                 Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright [yyyy] [name of copyright owner]

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/idubrov/json-patch ">json-patch 0.2.7</a></li>
          <li><a href=" https://github.com/retep998/winapi-rs ">winapi 0.3.9</a></li>
        </ul>
        <pre class="license-text">                                 Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;{}&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright {yyyy} {name of copyright owner}

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/srijs/rust-crc32fast ">crc32fast 1.3.2</a></li>
          <li><a href=" https://github.com/sfackler/foreign-types ">foreign-types 0.3.2</a></li>
          <li><a href=" https://github.com/sfackler/foreign-types ">foreign-types-shared 0.1.1</a></li>
          <li><a href=" https://github.com/sfackler/rust-jni-sys ">jni-sys 0.3.0</a></li>
        </ul>
        <pre class="license-text">                                 Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;{}&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright {yyyy} {name of copyright owner}

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.

    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Xudong-Huang/generator-rs.git ">generator 0.7.2</a></li>
        </ul>
        <pre class="license-text">                               Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;{}&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright [yyyy] [name of copyright owner]

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/soc/dirs-rs ">dirs 4.0.0</a></li>
          <li><a href=" https://github.com/xdg-rs/dirs ">dirs-next 2.0.0</a></li>
          <li><a href=" https://github.com/dirs-dev/dirs-sys-rs ">dirs-sys 0.3.7</a></li>
          <li><a href=" https://github.com/xdg-rs/dirs/tree/master/dirs-sys ">dirs-sys-next 0.1.2</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-lang/libc ">libc 0.2.139</a></li>
          <li><a href=" https://github.com/illicitonion/num_enum ">num_enum 0.5.7</a></li>
          <li><a href=" https://github.com/illicitonion/num_enum ">num_enum_derive 0.5.7</a></li>
          <li><a href=" https://github.com/dtolnay/proc-macro2 ">proc-macro2 1.0.50</a></li>
          <li><a href=" https://github.com/SimonSapin/rust-utf8 ">utf-8 0.7.6</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-channel 0.3.25</a></li>
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-core 0.3.25</a></li>
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-executor 0.3.25</a></li>
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-io 0.3.25</a></li>
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-macro 0.3.25</a></li>
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-task 0.3.25</a></li>
          <li><a href=" https://github.com/rust-lang/futures-rs ">futures-util 0.3.25</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright (c) 2016 Alex Crichton
    Copyright (c) 2017 The Tokio Authors

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/paholg/typenum ">typenum 1.16.0</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2014 Paho Lurie-Gregg

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.</pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Manishearth/pathdiff ">pathdiff 0.2.1</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2017 The Rust Project Developers

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/hyperium/http ">http 0.2.8</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2017 http-rs authors

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-lang-nursery/pin-utils ">pin-utils 0.1.0</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2018 The pin-utils authors

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/cryptocorrosion/cryptocorrosion ">ppv-lite86 0.2.17</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2019 The CryptoCorrosion Contributors

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://gitlab.com/CreepySkeleton/proc-macro-error ">proc-macro-error-attr 1.0.4</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2019-2020 CreepySkeleton &lt;creepy-skeleton@yandex.ru&gt;

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/dtolnay/anyhow ">anyhow 1.0.68</a></li>
          <li><a href=" https://github.com/cuviper/autocfg ">autocfg 1.1.0</a></li>
          <li><a href=" https://github.com/marshallpierce/rust-base64 ">base64 0.13.1</a></li>
          <li><a href=" https://github.com/bitflags/bitflags ">bitflags 1.3.2</a></li>
          <li><a href=" https://github.com/BurntSushi/bstr ">bstr 1.1.0</a></li>
          <li><a href=" https://github.com/fitzgen/bumpalo ">bumpalo 3.12.0</a></li>
          <li><a href=" https://github.com/rust-lang/cc-rs ">cc 1.0.78</a></li>
          <li><a href=" https://github.com/alexcrichton/cfg-if ">cfg-if 1.0.0</a></li>
          <li><a href=" https://github.com/servo/core-foundation-rs ">cocoa 0.24.1</a></li>
          <li><a href=" https://github.com/servo/core-foundation-rs ">core-foundation 0.9.3</a></li>
          <li><a href=" https://github.com/servo/core-foundation-rs ">core-foundation-sys 0.8.3</a></li>
          <li><a href=" https://github.com/servo/core-foundation-rs ">core-graphics 0.22.3</a></li>
          <li><a href=" https://github.com/crossbeam-rs/crossbeam ">crossbeam-channel 0.5.6</a></li>
          <li><a href=" https://github.com/crossbeam-rs/crossbeam ">crossbeam-utils 0.8.14</a></li>
          <li><a href=" https://github.com/japaric/cty ">cty 0.2.2</a></li>
          <li><a href=" https://github.com/dtolnay/dtoa ">dtoa 0.4.8</a></li>
          <li><a href=" https://github.com/smol-rs/fastrand ">fastrand 1.8.0</a></li>
          <li><a href=" https://github.com/alexcrichton/filetime ">filetime 0.2.19</a></li>
          <li><a href=" https://github.com/rust-lang/flate2-rs ">flate2 1.0.25</a></li>
          <li><a href=" https://github.com/servo/rust-fnv ">fnv 1.0.7</a></li>
          <li><a href=" https://github.com/servo/rust-url ">form_urlencoded 1.1.0</a></li>
          <li><a href=" https://github.com/servo/futf ">futf 0.1.5</a></li>
          <li><a href=" https://github.com/rust-lang/glob ">glob 0.3.1</a></li>
          <li><a href=" https://github.com/rust-lang/hashbrown ">hashbrown 0.12.3</a></li>
          <li><a href=" https://github.com/withoutboats/heck ">heck 0.3.3</a></li>
          <li><a href=" https://github.com/withoutboats/heck ">heck 0.4.0</a></li>
          <li><a href=" https://github.com/hermitcore/rusty-hermit ">hermit-abi 0.2.6</a></li>
          <li><a href=" https://github.com/servo/html5ever ">html5ever 0.25.2</a></li>
          <li><a href=" https://github.com/servo/rust-url/ ">idna 0.3.0</a></li>
          <li><a href=" https://github.com/bluss/indexmap ">indexmap 1.9.2</a></li>
          <li><a href=" https://github.com/dtolnay/itoa ">itoa 0.4.8</a></li>
          <li><a href=" https://github.com/dtolnay/itoa ">itoa 1.0.5</a></li>
          <li><a href=" https://github.com/jni-rs/jni-rs ">jni 0.20.0</a></li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/js-sys ">js-sys 0.3.60</a>
          </li>
          <li><a href=" https://github.com/rust-lang-nursery/lazy-static.rs ">lazy_static 1.4.0</a></li>
          <li><a href=" https://github.com/Amanieu/parking_lot ">lock_api 0.4.9</a></li>
          <li><a href=" https://github.com/servo/html5ever ">markup5ever 0.10.1</a></li>
          <li><a href=" https://github.com/bluss/arrayvec ">nodrop 0.1.14</a></li>
          <li><a href=" https://github.com/rust-num/num-integer ">num-integer 0.1.45</a></li>
          <li><a href=" https://github.com/rust-num/num-rational ">num-rational 0.4.1</a></li>
          <li><a href=" https://github.com/rust-num/num-traits ">num-traits 0.2.15</a></li>
          <li><a href=" https://github.com/seanmonstar/num_cpus ">num_cpus 1.15.0</a></li>
          <li><a href=" https://github.com/matklad/once_cell ">once_cell 1.17.0</a></li>
          <li><a href=" https://github.com/Amanieu/parking_lot ">parking_lot 0.12.1</a></li>
          <li><a href=" https://github.com/Amanieu/parking_lot ">parking_lot_core 0.9.6</a></li>
          <li><a href=" https://github.com/dtolnay/paste ">paste 1.0.11</a></li>
          <li><a href=" https://github.com/servo/rust-url/ ">percent-encoding 2.2.0</a></li>
          <li><a href=" https://github.com/pest-parser/pest ">pest 2.5.4</a></li>
          <li><a href=" https://github.com/rust-lang/pkg-config-rs ">pkg-config 0.3.26</a></li>
          <li><a href=" https://github.com/image-rs/image-png.git ">png 0.17.7</a></li>
          <li><a href=" https://github.com/dtolnay/proc-macro-hack ">proc-macro-hack 0.5.20+deprecated</a></li>
          <li><a href=" https://github.com/dtolnay/quote ">quote 1.0.23</a></li>
          <li><a href=" https://github.com/rust-lang/regex ">regex 1.7.1</a></li>
          <li><a href=" https://github.com/rust-lang/regex ">regex-syntax 0.6.28</a></li>
          <li><a href=" https://github.com/Kimundi/rustc-version-rs ">rustc_version 0.3.3</a></li>
          <li><a href=" https://github.com/Kimundi/rustc-version-rs ">rustc_version 0.4.0</a></li>
          <li><a href=" https://github.com/dtolnay/rustversion ">rustversion 1.0.11</a></li>
          <li><a href=" https://github.com/alexcrichton/scoped-tls ">scoped-tls 1.0.1</a></li>
          <li><a href=" https://github.com/bluss/scopeguard ">scopeguard 1.1.0</a></li>
          <li><a href=" https://github.com/dtolnay/semver ">semver 1.0.16</a></li>
          <li><a href=" https://github.com/serde-rs/serde ">serde 1.0.152</a></li>
          <li><a href=" https://github.com/serde-rs/serde ">serde_derive 1.0.152</a></li>
          <li><a href=" https://github.com/serde-rs/json ">serde_json 1.0.91</a></li>
          <li><a href=" https://github.com/dtolnay/serde-repr ">serde_repr 0.1.10</a></li>
          <li><a href=" https://github.com/jonasbb/serde_with ">serde_with 1.14.0</a></li>
          <li><a href=" https://github.com/jonasbb/serde_with/ ">serde_with_macros 1.5.2</a></li>
          <li><a href=" https://github.com/servo/rust-smallvec ">smallvec 1.10.0</a></li>
          <li><a href=" https://github.com/storyyeller/stable_deref_trait ">stable_deref_trait 1.2.0</a></li>
          <li><a href=" https://github.com/SergioBenitez/state ">state 0.5.3</a></li>
          <li><a href=" https://github.com/SergioBenitez/state ">state 0.5.3</a></li>
          <li><a href=" https://github.com/servo/string-cache ">string_cache 0.8.4</a></li>
          <li><a href=" https://github.com/servo/string-cache ">string_cache_codegen 0.5.2</a></li>
          <li><a href=" https://github.com/dtolnay/syn ">syn 1.0.107</a></li>
          <li><a href=" https://github.com/gdesmott/system-deps ">system-deps 5.0.0</a></li>
          <li><a href=" https://github.com/gdesmott/system-deps ">system-deps 6.0.3</a></li>
          <li><a href=" https://github.com/alexcrichton/tar-rs ">tar 0.4.38</a></li>
          <li><a href=" https://github.com/Stebalien/tempfile ">tempfile 3.3.0</a></li>
          <li><a href=" https://github.com/servo/tendril ">tendril 0.4.3</a></li>
          <li><a href=" https://github.com/dtolnay/thiserror ">thiserror 1.0.38</a></li>
          <li><a href=" https://github.com/dtolnay/thiserror ">thiserror-impl 1.0.38</a></li>
          <li><a href=" https://github.com/Amanieu/thread_local-rs ">thread_local 1.1.4</a></li>
          <li><a href=" https://github.com/toml-rs/toml ">toml 0.5.11</a></li>
          <li><a href=" https://github.com/toml-rs/toml ">toml_datetime 0.5.1</a></li>
          <li><a href=" https://github.com/ordian/toml_edit ">toml_edit 0.18.0</a></li>
          <li><a href=" https://github.com/BurntSushi/ucd-generate ">ucd-trie 0.1.5</a></li>
          <li><a href=" https://github.com/servo/unicode-bidi ">unicode-bidi 0.3.10</a></li>
          <li><a href=" https://github.com/dtolnay/unicode-ident ">unicode-ident 1.0.6</a></li>
          <li>
            <a href=" https://github.com/unicode-rs/unicode-normalization ">unicode-normalization 0.1.22</a>
          </li>
          <li><a href=" https://github.com/unicode-rs/unicode-segmentation ">unicode-segmentation 1.10.0</a></li>
          <li><a href=" https://github.com/servo/rust-url ">url 2.3.1</a></li>
          <li><a href=" https://github.com/uuid-rs/uuid ">uuid 1.2.2</a></li>
          <li><a href=" https://github.com/SergioBenitez/version_check ">version_check 0.9.4</a></li>
          <li><a href=" https://github.com/bytecodealliance/wasi ">wasi 0.11.0+wasi-snapshot-preview1</a></li>
          <li><a href=" https://github.com/bytecodealliance/wasi ">wasi 0.9.0+wasi-snapshot-preview1</a></li>
          <li><a href=" https://github.com/rustwasm/wasm-bindgen ">wasm-bindgen 0.2.83</a></li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/backend ">wasm-bindgen-backend
              0.2.83</a>
          </li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/futures ">wasm-bindgen-futures
              0.4.33</a>
          </li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/macro ">wasm-bindgen-macro
              0.2.83</a>
          </li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/macro-support ">wasm-bindgen-macro-support
              0.2.83</a>
          </li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/shared ">wasm-bindgen-shared
              0.2.83</a>
          </li>
          <li>
            <a href=" https://github.com/rustwasm/wasm-bindgen/tree/master/crates/web-sys ">web-sys 0.3.60</a>
          </li>
          <li><a href=" https://github.com/tauri-apps/wry ">wry 0.23.4</a></li>
          <li><a href=" https://github.com/Stebalien/xattr ">xattr 0.2.3</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/EmbarkStudios/cfg-expr ">cfg-expr 0.11.0</a></li>
          <li><a href=" https://github.com/EmbarkStudios/cfg-expr ">cfg-expr 0.9.1</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/RustCrypto/utils ">block-buffer 0.10.3</a></li>
          <li><a href=" https://github.com/RustCrypto/utils ">cpufeatures 0.2.5</a></li>
          <li><a href=" https://github.com/RustCrypto/traits ">crypto-common 0.1.6</a></li>
          <li><a href=" https://github.com/RustCrypto/traits ">digest 0.10.6</a></li>
          <li><a href=" https://github.com/RustCrypto/hashes ">sha2 0.10.6</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-random/rand ">rand 0.8.5</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         https://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-random/rand ">rand_core 0.6.4</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         https://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-random/getrandom ">getrandom 0.1.16</a></li>
          <li><a href=" https://github.com/rust-random/getrandom ">getrandom 0.2.8</a></li>
          <li><a href=" https://github.com/rust-random/rand ">rand 0.7.3</a></li>
          <li><a href=" https://github.com/rust-random/rand ">rand_chacha 0.2.2</a></li>
          <li><a href=" https://github.com/rust-random/rand ">rand_chacha 0.3.1</a></li>
          <li><a href=" https://github.com/rust-random/rand ">rand_core 0.5.1</a></li>
          <li><a href=" https://github.com/rust-random/rand ">rand_hc 0.2.0</a></li>
          <li><a href=" https://github.com/rust-random/rand ">rand_pcg 0.2.1</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         https://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/jonas-schievink/adler.git ">adler 1.0.2</a></li>
          <li><a href=" https://github.com/bkchr/proc-macro-crate ">proc-macro-crate 1.3.0</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         https://www.apache.org/licenses/LICENSE-2.0

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://gitlab.com/CreepySkeleton/proc-macro-error ">proc-macro-error 1.0.4</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright 2019-2020 CreepySkeleton &lt;creepy-skeleton@yandex.ru&gt;

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/rust-lang/log ">log 0.4.17</a></li>
          <li><a href=" https://github.com/abonander/safemem ">safemem 0.3.3</a></li>
          <li><a href=" https://github.com/steveklabnik/semver ">semver 0.11.0</a></li>
          <li><a href=" https://github.com/steveklabnik/semver-parser ">semver-parser 0.10.2</a></li>
          <li><a href=" https://github.com/uuid-rs/uuid ">uuid 0.8.2</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

       To apply the Apache License to your work, attach the following
       boilerplate notice, with the fields enclosed by brackets &quot;[]&quot;
       replaced with your own identifying information. (Don&#x27;t include
       the brackets!)  The text should be enclosed in the appropriate
       comment syntax for the file format. We also recommend that a
       file or class name and description of purpose be included on the
       same &quot;printed page&quot; as the copyright notice for easier
       identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/XAMPPRocky/remove_dir_all.git ">remove_dir_all 0.5.3</a></li>
        </ul>
        <pre class="license-text">                              Apache License
                            Version 2.0, January 2004
                         http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

       &quot;License&quot; shall mean the terms and conditions for use, reproduction,
       and distribution as defined by Sections 1 through 9 of this document.

       &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
       the copyright owner that is granting the License.

       &quot;Legal Entity&quot; shall mean the union of the acting entity and all
       other entities that control, are controlled by, or are under common
       control with that entity. For the purposes of this definition,
       &quot;control&quot; means (i) the power, direct or indirect, to cause the
       direction or management of such entity, whether by contract or
       otherwise, or (ii) ownership of fifty percent (50%) or more of the
       outstanding shares, or (iii) beneficial ownership of such entity.

       &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
       exercising permissions granted by this License.

       &quot;Source&quot; form shall mean the preferred form for making modifications,
       including but not limited to software source code, documentation
       source, and configuration files.

       &quot;Object&quot; form shall mean any form resulting from mechanical
       transformation or translation of a Source form, including but
       not limited to compiled object code, generated documentation,
       and conversions to other media types.

       &quot;Work&quot; shall mean the work of authorship, whether in Source or
       Object form, made available under the License, as indicated by a
       copyright notice that is included in or attached to the work
       (an example is provided in the Appendix below).

       &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
       form, that is based on (or derived from) the Work and for which the
       editorial revisions, annotations, elaborations, or other modifications
       represent, as a whole, an original work of authorship. For the purposes
       of this License, Derivative Works shall not include works that remain
       separable from, or merely link (or bind by name) to the interfaces of,
       the Work and Derivative Works thereof.

       &quot;Contribution&quot; shall mean any work of authorship, including
       the original version of the Work and any modifications or additions
       to that Work or Derivative Works thereof, that is intentionally
       submitted to Licensor for inclusion in the Work by the copyright owner
       or by an individual or Legal Entity authorized to submit on behalf of
       the copyright owner. For the purposes of this definition, &quot;submitted&quot;
       means any form of electronic, verbal, or written communication sent
       to the Licensor or its representatives, including but not limited to
       communication on electronic mailing lists, source code control systems,
       and issue tracking systems that are managed by, or on behalf of, the
       Licensor for the purpose of discussing and improving the Work, but
       excluding communication that is conspicuously marked or otherwise
       designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

       &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
       on behalf of whom a Contribution has been received by Licensor and
       subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       copyright license to reproduce, prepare Derivative Works of,
       publicly display, publicly perform, sublicense, and distribute the
       Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of
       this License, each Contributor hereby grants to You a perpetual,
       worldwide, non-exclusive, no-charge, royalty-free, irrevocable
       (except as stated in this section) patent license to make, have made,
       use, offer to sell, sell, import, and otherwise transfer the Work,
       where such license applies only to those patent claims licensable
       by such Contributor that are necessarily infringed by their
       Contribution(s) alone or by combination of their Contribution(s)
       with the Work to which such Contribution(s) was submitted. If You
       institute patent litigation against any entity (including a
       cross-claim or counterclaim in a lawsuit) alleging that the Work
       or a Contribution incorporated within the Work constitutes direct
       or contributory patent infringement, then any patent licenses
       granted to You under this License for that Work shall terminate
       as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the
       Work or Derivative Works thereof in any medium, with or without
       modifications, and in Source or Object form, provided that You
       meet the following conditions:

       (a) You must give any other recipients of the Work or
           Derivative Works a copy of this License; and

       (b) You must cause any modified files to carry prominent notices
           stating that You changed the files; and

       (c) You must retain, in the Source form of any Derivative Works
           that You distribute, all copyright, patent, trademark, and
           attribution notices from the Source form of the Work,
           excluding those notices that do not pertain to any part of
           the Derivative Works; and

       (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
           distribution, then any Derivative Works that You distribute must
           include a readable copy of the attribution notices contained
           within such NOTICE file, excluding those notices that do not
           pertain to any part of the Derivative Works, in at least one
           of the following places: within a NOTICE text file distributed
           as part of the Derivative Works; within the Source form or
           documentation, if provided along with the Derivative Works; or,
           within a display generated by the Derivative Works, if and
           wherever such third-party notices normally appear. The contents
           of the NOTICE file are for informational purposes only and
           do not modify the License. You may add Your own attribution
           notices within Derivative Works that You distribute, alongside
           or as an addendum to the NOTICE text from the Work, provided
           that such additional attribution notices cannot be construed
           as modifying the License.

       You may add Your own copyright statement to Your modifications and
       may provide additional or different license terms and conditions
       for use, reproduction, or distribution of Your modifications, or
       for any such Derivative Works as a whole, provided Your use,
       reproduction, and distribution of the Work otherwise complies with
       the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise,
       any Contribution intentionally submitted for inclusion in the Work
       by You to the Licensor shall be under the terms and conditions of
       this License, without any additional terms or conditions.
       Notwithstanding the above, nothing herein shall supersede or modify
       the terms of any separate license agreement you may have executed
       with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade
       names, trademarks, service marks, or product names of the Licensor,
       except as required for reasonable and customary use in describing the
       origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or
       agreed to in writing, Licensor provides the Work (and each
       Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
       implied, including, without limitation, any warranties or conditions
       of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
       PARTICULAR PURPOSE. You are solely responsible for determining the
       appropriateness of using or redistributing the Work and assume any
       risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory,
       whether in tort (including negligence), contract, or otherwise,
       unless required by applicable law (such as deliberate and grossly
       negligent acts) or agreed to in writing, shall any Contributor be
       liable to You for damages, including any direct, indirect, special,
       incidental, or consequential damages of any character arising as a
       result of this License or out of the use or inability to use the
       Work (including but not limited to damages for loss of goodwill,
       work stoppage, computer failure or malfunction, or any and all
       other commercial damages or losses), even if such Contributor
       has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing
       the Work or Derivative Works thereof, You may choose to offer,
       and charge a fee for, acceptance of support, warranty, indemnity,
       or other liability obligations and/or rights consistent with this
       License. However, in accepting such obligations, You may act only
       on Your own behalf and on Your sole responsibility, not on behalf
       of any other Contributor, and only if You agree to indemnify,
       defend, and hold each Contributor harmless for any liability
       incurred by, or claims asserted against, such Contributor by reason
       of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    Copyright 2017 Aaron Power

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    	http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/seanmonstar/num_cpus ">num_cpus 1.15.0</a></li>
        </ul>
        <pre class="license-text"># Contributing

    ## License

    Licensed under either of

     * Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
     * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

    at your option.

    ### Contribution

    Unless you explicitly state otherwise, any contribution intentionally submitted
    for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any
    additional terms or conditions.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/retep998/winapi-rs ">winapi 0.3.9</a></li>
        </ul>
        <pre class="license-text">// Licensed under the Apache License, Version 2.0
    // &lt;LICENSE-APACHE or http://www.apache.org/licenses/LICENSE-2.0&gt; or the MIT license
    // &lt;LICENSE-MIT or http://opensource.org/licenses/MIT&gt;, at your option.
    // All files in the project carrying such notice may not be copied, modified, or distributed
    // except according to those terms.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tauri-apps/tao ">tao 0.15.8</a></li>
        </ul>
        <pre class="license-text">Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;{}&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright {yyyy} {name of copyright owner}

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.</pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/mmastrac/rust-ctor ">ctor 0.1.26</a></li>
        </ul>
        <pre class="license-text">Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/

       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

       1. Definitions.

          &quot;License&quot; shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.

          &quot;Licensor&quot; shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.

          &quot;Legal Entity&quot; shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          &quot;control&quot; means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.

          &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity
          exercising permissions granted by this License.

          &quot;Source&quot; form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.

          &quot;Object&quot; form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.

          &quot;Work&quot; shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).

          &quot;Derivative Works&quot; shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.

          &quot;Contribution&quot; shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, &quot;submitted&quot;
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

          &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.

       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.

       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.

       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:

          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and

          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and

          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and

          (d) If the Work includes a &quot;NOTICE&quot; text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.

          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.

       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.

       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.

       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.

       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.

       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.

       END OF TERMS AND CONDITIONS

       APPENDIX: How to apply the Apache License to your work.

          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets &quot;{}&quot;
          replaced with your own identifying information. (Don&#x27;t include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same &quot;printed page&quot; as the copyright notice for easier
          identification within third-party archives.

       Copyright {yyyy} {name of copyright owner}

       Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://gitlab.com/crates.rs/cargo_toml ">cargo_toml 0.13.3</a></li>
          <li><a href=" https://github.com/emk/cesu8-rs ">cesu8 1.1.0</a></li>
          <li><a href=" https://github.com/servo/core-foundation-rs ">cocoa-foundation 0.1.0</a></li>
          <li><a href=" https://github.com/servo/core-foundation-rs ">core-graphics-types 0.1.1</a></li>
          <li><a href=" https://github.com/Diggsey/rust-field-offset ">field-offset 0.3.4</a></li>
          <li><a href=" https://github.com/cbreeden/fxhash ">fxhash 0.2.1</a></li>
          <li><a href=" https://github.com/TedDriggs/ident_case ">ident_case 1.0.1</a></li>
          <li><a href=" https://github.com/trobonox/tauri ">kanri 0.3.1</a></li>
          <li><a href=" https://github.com/reem/rust-mac.git ">mac 0.1.1</a></li>
          <li><a href=" https://github.com/rust-windowing/android-ndk-rs ">ndk 0.6.0</a></li>
          <li><a href=" https://github.com/rust-windowing/android-ndk-rs ">ndk-context 0.1.1</a></li>
          <li><a href=" https://github.com/rust-windowing/android-ndk-rs ">ndk-sys 0.3.0</a></li>
          <li><a href=" https://github.com/servo/servo ">servo_arc 0.1.1</a></li>
          <li><a href=" https://github.com/jedisct1/rust-siphash ">siphasher 0.3.10</a></li>
          <li><a href=" https://github.com/Soveu/tinyvec_macros ">tinyvec_macros 0.1.0</a></li>
          <li><a href=" https://github.com/Byron/treediff-rs ">treediff 3.0.2</a></li>
          <li><a href=" https://github.com/retep998/winapi-rs ">winapi-i686-pc-windows-gnu 0.4.0</a></li>
          <li><a href=" https://github.com/retep998/winapi-rs ">winapi-x86_64-pc-windows-gnu 0.4.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows-bindgen 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows-implement 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows-metadata 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows-tokens 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_aarch64_gnullvm 0.42.1</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_aarch64_msvc 0.37.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_aarch64_msvc 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_aarch64_msvc 0.42.1</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_i686_gnu 0.37.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_i686_gnu 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_i686_gnu 0.42.1</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_i686_msvc 0.37.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_i686_msvc 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_i686_msvc 0.42.1</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_gnu 0.37.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_gnu 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_gnu 0.42.1</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_gnullvm 0.42.1</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_msvc 0.37.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_msvc 0.39.0</a></li>
          <li><a href=" https://github.com/microsoft/windows-rs ">windows_x86_64_msvc 0.42.1</a></li>
        </ul>
        <pre class="license-text">Apache License
    Version 2.0, January 2004
    http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

    1. Definitions.

    &quot;License&quot; shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

    &quot;Licensor&quot; shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

    &quot;Legal Entity&quot; shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, &quot;control&quot; means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

    &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity exercising permissions granted by this License.

    &quot;Source&quot; form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

    &quot;Object&quot; form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

    &quot;Work&quot; shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

    &quot;Derivative Works&quot; shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

    &quot;Contribution&quot; shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, &quot;submitted&quot; means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

    &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

    2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

    3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

    4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

         (a) You must give any other recipients of the Work or Derivative Works a copy of this License; and

         (b) You must cause any modified files to carry prominent notices stating that You changed the files; and

         (c) You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and

         (d) If the Work includes a &quot;NOTICE&quot; text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.

         You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.

    5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

    6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

    7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

    8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

    9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

    To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets &quot;[]&quot; replaced with your own identifying information. (Don&#x27;t include the brackets!)  The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same &quot;printed page&quot; as the copyright notice for easier identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Lokathor/bytemuck ">bytemuck 1.13.0</a></li>
        </ul>
        <pre class="license-text">Apache License
    Version 2.0, January 2004
    http://www.apache.org/licenses/

    TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

        1. Definitions.

            &quot;License&quot; shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

            &quot;Licensor&quot; shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

            &quot;Legal Entity&quot; shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, &quot;control&quot; means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

            &quot;You&quot; (or &quot;Your&quot;) shall mean an individual or Legal Entity exercising permissions granted by this License.

            &quot;Source&quot; form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

            &quot;Object&quot; form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

            &quot;Work&quot; shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

            &quot;Derivative Works&quot; shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

            &quot;Contribution&quot; shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, &quot;submitted&quot; means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as &quot;Not a Contribution.&quot;

            &quot;Contributor&quot; shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
        2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
        3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
        4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
            (a) You must give any other recipients of the Work or Derivative Works a copy of this License; and
            (b) You must cause any modified files to carry prominent notices stating that You changed the files; and
            (c) You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
            (d) If the Work includes a &quot;NOTICE&quot; text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.

            You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
        5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
        6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
        7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
        8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
        9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.

    END OF TERMS AND CONDITIONS

    APPENDIX: How to apply the Apache License to your work.

    To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets &quot;[]&quot; replaced with your own identifying information. (Don&#x27;t include the brackets!) The text should be enclosed in the appropriate comment syntax for the file format. We also recommend that a file or class name and description of purpose be included on the same &quot;printed page&quot; as the copyright notice for easier identification within third-party archives.

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li>
            <a href=" https://github.com/unicode-rs/unicode-normalization ">unicode-normalization 0.1.22</a>
          </li>
          <li><a href=" https://github.com/unicode-rs/unicode-segmentation ">unicode-segmentation 1.10.0</a></li>
        </ul>
        <pre class="license-text">Licensed under the Apache License, Version 2.0
    &lt;LICENSE-APACHE or
    http://www.apache.org/licenses/LICENSE-2.0&gt; or the MIT
    license &lt;LICENSE-MIT or http://opensource.org/licenses/MIT&gt;,
    at your option. All files in the project carrying such
    notice may not be copied, modified, or distributed except
    according to those terms.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/servo/core-foundation-rs ">cocoa 0.24.1</a></li>
        </ul>
        <pre class="license-text">Licensed under the Apache License, Version 2.0 &lt;LICENSE-APACHE or
    http://www.apache.org/licenses/LICENSE-2.0&gt; or the MIT license
    &lt;LICENSE-MIT or http://opensource.org/licenses/MIT&gt;, at your
    option. All files in the project carrying such notice may not be
    copied, modified, or distributed except according to those terms.
    </pre>
      </li>
      <li class="license">
        <h3 id="Apache-2.0">
          Apache License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/paholg/typenum ">typenum 1.16.0</a></li>
        </ul>
        <pre class="license-text">MIT OR Apache-2.0</pre>
      </li>
      <li class="license">
        <h3 id="BSD-3-Clause">
          BSD 3-Clause &quot;New&quot; or &quot;Revised&quot; License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/dropbox/rust-alloc-no-stdlib ">alloc-no-stdlib 2.0.4</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2016 Dropbox, Inc.
    All rights reserved.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &quot;AS IS&quot; AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </pre>
      </li>
      <li class="license">
        <h3 id="BSD-3-Clause">
          BSD 3-Clause &quot;New&quot; or &quot;Revised&quot; License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/sebcrozet/instant ">instant 0.1.12</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2019, S├®bastien Crozet
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

    3. Neither the name of the author nor the names of its contributors may be used
       to endorse or promote products derived from this software without specific
       prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &quot;AS IS&quot; AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </pre>
      </li>
      <li class="license">
        <h3 id="BSD-3-Clause">
          BSD 3-Clause &quot;New&quot; or &quot;Revised&quot; License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/dropbox/rust-alloc-no-stdlib ">alloc-stdlib 0.2.2</a></li>
        </ul>
        <pre class="license-text">Copyright (c) &lt;year&gt; &lt;owner&gt;.

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &quot;AS IS&quot; AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </pre>
      </li>
      <li class="license">
        <h3 id="BSD-3-Clause">
          BSD 3-Clause &quot;New&quot; or &quot;Revised&quot; License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/hsivonen/encoding_rs ">encoding_rs 0.8.31</a></li>
        </ul>
        <pre class="license-text">Copyright ┬® WHATWG (Apple, Google, Mozilla, Microsoft).

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its
       contributors may be used to endorse or promote products derived from
       this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS &quot;AS IS&quot;
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </pre>
      </li>
      <li class="license">
        <h3 id="CC0-1.0">
          Creative Commons Zero v1.0 Universal
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://gitlab.com/kornelski/dunce ">dunce 1.0.3</a></li>
        </ul>
        <pre class="license-text">Creative Commons Legal Code

    CC0 1.0 Universal

        CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE
        LEGAL SERVICES. DISTRIBUTION OF THIS DOCUMENT DOES NOT CREATE AN
        ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS
        INFORMATION ON AN &quot;AS-IS&quot; BASIS. CREATIVE COMMONS MAKES NO WARRANTIES
        REGARDING THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS
        PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM
        THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED
        HEREUNDER.

    Statement of Purpose

    The laws of most jurisdictions throughout the world automatically confer
    exclusive Copyright and Related Rights (defined below) upon the creator
    and subsequent owner(s) (each and all, an &quot;owner&quot;) of an original work of
    authorship and/or a database (each, a &quot;Work&quot;).

    Certain owners wish to permanently relinquish those rights to a Work for
    the purpose of contributing to a commons of creative, cultural and
    scientific works (&quot;Commons&quot;) that the public can reliably and without fear
    of later claims of infringement build upon, modify, incorporate in other
    works, reuse and redistribute as freely as possible in any form whatsoever
    and for any purposes, including without limitation commercial purposes.
    These owners may contribute to the Commons to promote the ideal of a free
    culture and the further production of creative, cultural and scientific
    works, or to gain reputation or greater distribution for their Work in
    part through the use and efforts of others.

    For these and/or other purposes and motivations, and without any
    expectation of additional consideration or compensation, the person
    associating CC0 with a Work (the &quot;Affirmer&quot;), to the extent that he or she
    is an owner of Copyright and Related Rights in the Work, voluntarily
    elects to apply CC0 to the Work and publicly distribute the Work under its
    terms, with knowledge of his or her Copyright and Related Rights in the
    Work and the meaning and intended legal effect of CC0 on those rights.

    1. Copyright and Related Rights. A Work made available under CC0 may be
    protected by copyright and related or neighboring rights (&quot;Copyright and
    Related Rights&quot;). Copyright and Related Rights include, but are not
    limited to, the following:

      i. the right to reproduce, adapt, distribute, perform, display,
         communicate, and translate a Work;
     ii. moral rights retained by the original author(s) and/or performer(s);
    iii. publicity and privacy rights pertaining to a person&#x27;s image or
         likeness depicted in a Work;
     iv. rights protecting against unfair competition in regards to a Work,
         subject to the limitations in paragraph 4(a), below;
      v. rights protecting the extraction, dissemination, use and reuse of data
         in a Work;
     vi. database rights (such as those arising under Directive 96/9/EC of the
         European Parliament and of the Council of 11 March 1996 on the legal
         protection of databases, and under any national implementation
         thereof, including any amended or successor version of such
         directive); and
    vii. other similar, equivalent or corresponding rights throughout the
         world based on applicable law or treaty, and any national
         implementations thereof.

    2. Waiver. To the greatest extent permitted by, but not in contravention
    of, applicable law, Affirmer hereby overtly, fully, permanently,
    irrevocably and unconditionally waives, abandons, and surrenders all of
    Affirmer&#x27;s Copyright and Related Rights and associated claims and causes
    of action, whether now known or unknown (including existing as well as
    future claims and causes of action), in the Work (i) in all territories
    worldwide, (ii) for the maximum duration provided by applicable law or
    treaty (including future time extensions), (iii) in any current or future
    medium and for any number of copies, and (iv) for any purpose whatsoever,
    including without limitation commercial, advertising or promotional
    purposes (the &quot;Waiver&quot;). Affirmer makes the Waiver for the benefit of each
    member of the public at large and to the detriment of Affirmer&#x27;s heirs and
    successors, fully intending that such Waiver shall not be subject to
    revocation, rescission, cancellation, termination, or any other legal or
    equitable action to disrupt the quiet enjoyment of the Work by the public
    as contemplated by Affirmer&#x27;s express Statement of Purpose.

    3. Public License Fallback. Should any part of the Waiver for any reason
    be judged legally invalid or ineffective under applicable law, then the
    Waiver shall be preserved to the maximum extent permitted taking into
    account Affirmer&#x27;s express Statement of Purpose. In addition, to the
    extent the Waiver is so judged Affirmer hereby grants to each affected
    person a royalty-free, non transferable, non sublicensable, non exclusive,
    irrevocable and unconditional license to exercise Affirmer&#x27;s Copyright and
    Related Rights in the Work (i) in all territories worldwide, (ii) for the
    maximum duration provided by applicable law or treaty (including future
    time extensions), (iii) in any current or future medium and for any number
    of copies, and (iv) for any purpose whatsoever, including without
    limitation commercial, advertising or promotional purposes (the
    &quot;License&quot;). The License shall be deemed effective as of the date CC0 was
    applied by Affirmer to the Work. Should any part of the License for any
    reason be judged legally invalid or ineffective under applicable law, such
    partial invalidity or ineffectiveness shall not invalidate the remainder
    of the License, and in such case Affirmer hereby affirms that he or she
    will not (i) exercise any of his or her remaining Copyright and Related
    Rights in the Work or (ii) assert any associated claims and causes of
    action with respect to the Work, in either case contrary to Affirmer&#x27;s
    express Statement of Purpose.

    4. Limitations and Disclaimers.

     a. No trademark or patent rights held by Affirmer are waived, abandoned,
        surrendered, licensed or otherwise affected by this document.
     b. Affirmer offers the Work as-is and makes no representations or
        warranties of any kind concerning the Work, express, implied,
        statutory or otherwise, including without limitation warranties of
        title, merchantability, fitness for a particular purpose, non
        infringement, or the absence of latent or other defects, accuracy, or
        the present or absence of errors, whether or not discoverable, all to
        the greatest extent permissible under applicable law.
     c. Affirmer disclaims responsibility for clearing rights of other persons
        that may apply to the Work or any use thereof, including without
        limitation any person&#x27;s Copyright and Related Rights in the Work.
        Further, Affirmer disclaims responsibility for obtaining any necessary
        consents, permissions or other rights required for any use of the
        Work.
     d. Affirmer understands and acknowledges that Creative Commons is not a
        party to this document and has no duty or obligation with respect to
        this CC0 or use of the Work.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/SimonSapin/rust-std-candidates ">matches 0.1.10</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2014-2016 Simon Sapin

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/epage/nom-experimental ">nom8 0.2.0</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2014-2019 Geoffroy Couprie

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    &quot;Software&quot;), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/ebarnard/rust-plist/ ">plist 1.4.0</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2015 Edward Barnard

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.</pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/gentoo90/winreg-rs ">winreg 0.10.1</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2015 Igor Shaula

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/mbrubeck/rust-debug-unreachable ">new_debug_unreachable 1.0.4</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2015 Jonathan Reem

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tauri-apps/webkit2gtk-rs ">webkit2gtk-sys 0.18.0</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2016 Boucher, Antoni &lt;bouanto@zoho.com&gt;

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the &quot;Software&quot;), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tauri-apps/webkit2gtk-rs ">webkit2gtk 0.18.2</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2016 Boucher, Antoni &lt;bouanto@zoho.com&gt;
    Copyright (c) 2017-2021, The Gtk-rs Project Developers.
    Copyright (c) 2021, Tauri Programme within The Commons Conservancy

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the &quot;Software&quot;), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Gilnaa/memoffset ">memoffset 0.6.5</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2017 Gilad Naaman

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.</pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://gitlab.redox-os.org/redox-os/syscall ">redox_syscall 0.2.16</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2017 Redox OS Developers

    MIT License

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    &quot;Software&quot;), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/timvisee/version-compare ">version-compare 0.0.11</a></li>
          <li><a href=" https://gitlab.com/timvisee/version-compare ">version-compare 0.1.1</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2017 Tim Vis├®e

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tokio-rs/bytes ">bytes 1.3.0</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2018 Carl Lerche

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tokio-rs/loom ">loom 0.5.6</a></li>
          <li><a href=" https://github.com/tokio-rs/slab ">slab 0.4.7</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2019 Carl Lerche

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/hawkw/sharded-slab ">sharded-slab 0.1.4</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2019 Eliza Weisman

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/hawkw/matchers ">matchers 0.1.0</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2019 Eliza Weisman

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tokio-rs/tracing ">tracing 0.1.37</a></li>
          <li><a href=" https://github.com/tokio-rs/tracing ">tracing-attributes 0.1.23</a></li>
          <li><a href=" https://github.com/tokio-rs/tracing ">tracing-core 0.1.30</a></li>
          <li><a href=" https://github.com/tokio-rs/tracing ">tracing-log 0.1.3</a></li>
          <li><a href=" https://github.com/tokio-rs/tracing ">tracing-subscriber 0.3.16</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2019 Tokio Contributors

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tokio-rs/tokio ">tokio 1.24.2</a></li>
        </ul>
        <pre class="license-text">Copyright (c) 2022 Tokio Contributors

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/mxre/winres ">winres 0.1.12</a></li>
        </ul>
        <pre class="license-text">Copyright 2016 Max Resch

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/bancek/rust-http-range.git ">http-range 0.1.5</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2016 Luka Zakraj┼íek

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/emilio/precomputed-hash ">precomputed-hash 0.1.1</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2017 Emilio Cobos ├ülvarez

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/mdsteele/rust-cfb ">cfb 0.6.1</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2017 Matthew D. Steele

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/TedDriggs/darling ">darling 0.13.4</a></li>
          <li><a href=" https://github.com/TedDriggs/darling ">darling_core 0.13.4</a></li>
          <li><a href=" https://github.com/TedDriggs/darling ">darling_macro 0.13.4</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2017 Ted Driggs

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/mdsteele/rust-ico ">ico 0.2.0</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2018 Matthew D. Steele

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/bojand/infer ">infer 0.7.0</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2019 Bojan

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/PolyMeilex/rfd ">rfd 0.10.0</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2022 Bart┼éomiej Mary┼äczak

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/zzzgydi/auto-launch.git ">auto-launch 0.4.0</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2022 zzzgydi

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" http://github.com/SSheldon/rust-block ">block 0.1.6</a></li>
          <li><a href=" https://github.com/dropbox/rust-brotli ">brotli 3.3.4</a></li>
          <li><a href=" https://github.com/dropbox/rust-brotli-decompressor ">brotli-decompressor 2.3.4</a></li>
          <li><a href=" https://github.com/rutrum/convert-case ">convert_case 0.4.0</a></li>
          <li><a href=" http://github.com/SSheldon/rust-dispatch ">dispatch 0.2.0</a></li>
          <li><a href=" https://github.com/SimonSapin/kuchiki ">kuchiki 0.8.1</a></li>
          <li><a href=" https://github.com/SSheldon/malloc_buf ">malloc_buf 0.0.6</a></li>
          <li><a href=" http://github.com/SSheldon/rust-objc-foundation ">objc-foundation 0.1.1</a></li>
          <li><a href=" http://github.com/SSheldon/rust-objc-exception ">objc_exception 0.1.2</a></li>
          <li><a href=" http://github.com/SSheldon/rust-objc-id ">objc_id 0.1.1</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf 0.10.1</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf 0.8.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_codegen 0.8.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_generator 0.10.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_generator 0.8.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_macros 0.10.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_macros 0.8.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_shared 0.10.0</a></li>
          <li><a href=" https://github.com/sfackler/rust-phf ">phf_shared 0.8.0</a></li>
          <li><a href=" https://crates.io/crates/soup2-sys ">soup2-sys 0.2.0</a></li>
          <li><a href=" https://github.com/tokio-rs/valuable ">valuable 0.1.0</a></li>
          <li><a href=" https://github.com/wravery/webview2-rs ">webview2-com 0.19.1</a></li>
          <li><a href=" https://github.com/wravery/webview2-rs ">webview2-com-macros 0.6.0</a></li>
          <li><a href=" https://github.com/wravery/webview2-rs ">webview2-com-sys 0.19.0</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) &lt;year&gt; &lt;copyright holders&gt;

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" http://github.com/SSheldon/rust-objc ">objc 0.2.7</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) Steven Sheldon

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/danaugrs/overload ">overload 0.1.1</a></li>
        </ul>
        <pre class="license-text">MIT License

    Copyright (c) 2019 Daniel Augusto Rizzi Salvadori

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.</pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/AltF02/x11-rs.git ">x11 2.21.0</a></li>
          <li><a href=" https://github.com/AltF02/x11-rs.git ">x11-dl 2.21.0</a></li>
        </ul>
        <pre class="license-text">Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the &quot;Software&quot;), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
    SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
    IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">atk 0.15.1</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">atk-sys 0.15.1</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">cairo-rs 0.15.12</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">cairo-sys-rs 0.15.1</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">gdk 0.15.4</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">gdk-pixbuf 0.15.11</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">gdk-pixbuf-sys 0.15.10</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">gdk-sys 0.15.1</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">gdkx11-sys 0.15.1</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">gio 0.15.12</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">gio-sys 0.15.10</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">glib 0.15.12</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">glib-macros 0.15.11</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">glib-sys 0.15.10</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">gobject-sys 0.15.10</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">gtk 0.15.5</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">gtk-sys 0.15.3</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk3-rs ">gtk3-macros 0.15.4</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">pango 0.15.10</a></li>
          <li><a href=" https://github.com/gtk-rs/gtk-rs-core ">pango-sys 0.15.10</a></li>
        </ul>
        <pre class="license-text">Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tauri-apps/javascriptcore-rs ">javascriptcore-rs-sys 0.4.0</a></li>
          <li><a href=" https://crates.io/crates/soup2 ">soup2 0.2.1</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2013-2017, The Gtk-rs Project Developers.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tauri-apps/javascriptcore-rs ">javascriptcore-rs 0.16.0</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2013-2021, The Gtk-rs Project Developers.
    Copyright (c) 2021, Tauri Programme within The Commons Conservancy.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/nushell/nu-ansi-term ">nu-ansi-term 0.46.0</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2014 Benjamin Sago
    Copyright (c) 2021-2022 The Nushell Project Developers

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tokio-rs/tracing ">tracing-core 0.1.30</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2014 Mathijs van de Nes

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/image-rs/image ">image 0.24.5</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2014 PistonDevelopers

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.</pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/BurntSushi/aho-corasick ">aho-corasick 0.7.20</a></li>
          <li><a href=" https://github.com/BurntSushi/byteorder ">byteorder 1.4.3</a></li>
          <li><a href=" https://github.com/BurntSushi/ripgrep/tree/master/crates/globset ">globset 0.4.10</a></li>
          <li><a href=" https://github.com/BurntSushi/ripgrep/tree/master/crates/ignore ">ignore 0.4.18</a></li>
          <li><a href=" https://github.com/BurntSushi/memchr ">memchr 2.5.0</a></li>
          <li><a href=" https://github.com/BurntSushi/regex-automata ">regex-automata 0.1.10</a></li>
          <li><a href=" https://github.com/BurntSushi/walkdir ">walkdir 2.3.2</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2015 Andrew Gallant

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/dguo/strsim-rs ">strsim 0.10.0</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2015 Danny Guo
    Copyright (c) 2016 Titus Wormer &lt;tituswormer@gmail.com&gt;
    Copyright (c) 2018 Akash Kurdekar

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Marwes/combine ">combine 4.6.6</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2015 Markus Westerlind

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/JelteF/derive_more ">derive_more 0.99.17</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2016 Jelte Fennema

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/image-rs/color_quant.git ">color_quant 1.1.0</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2016 PistonDevelopers

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/BurntSushi/same-file ">same-file 1.0.6</a></li>
          <li><a href=" https://github.com/BurntSushi/winapi-util ">winapi-util 0.1.5</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2017 Andrew Gallant

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://gitlab.redox-os.org/redox-os/users ">redox_users 0.4.3</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2017 Jose Narvaez

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/Byron/open-rs ">open 3.2.0</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)
    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

    Copyright ┬® &#x60;2015&#x60; &#x60;Sebastian Thiel&#x60;

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the ÔÇ£SoftwareÔÇØ), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED ÔÇ£AS ISÔÇØ, WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/servo/bincode ">bincode 1.3.3</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2014 Ty Overby

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/fizyk20/generic-array.git ">generic-array 0.14.6</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2015 Bart┼éomiej Kami┼äski

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.</pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/tafia/quick-xml ">quick-xml 0.26.0</a></li>
        </ul>
        <pre class="license-text">The MIT License (MIT)

    Copyright (c) 2016 Johann Tuffe

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the &quot;Software&quot;), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:


    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.


    THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    </pre>
      </li>
      <li class="license">
        <h3 id="MIT">
          MIT License
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/BurntSushi/aho-corasick ">aho-corasick 0.7.20</a></li>
          <li><a href=" https://github.com/BurntSushi/byteorder ">byteorder 1.4.3</a></li>
          <li><a href=" https://github.com/BurntSushi/ripgrep/tree/master/crates/globset ">globset 0.4.10</a></li>
          <li><a href=" https://github.com/BurntSushi/ripgrep/tree/master/crates/ignore ">ignore 0.4.18</a></li>
          <li><a href=" https://github.com/BurntSushi/memchr ">memchr 2.5.0</a></li>
          <li><a href=" https://github.com/BurntSushi/regex-automata ">regex-automata 0.1.10</a></li>
          <li><a href=" https://github.com/BurntSushi/same-file ">same-file 1.0.6</a></li>
          <li><a href=" https://github.com/BurntSushi/walkdir ">walkdir 2.3.2</a></li>
          <li><a href=" https://github.com/BurntSushi/winapi-util ">winapi-util 0.1.5</a></li>
        </ul>
        <pre class="license-text">This project is dual-licensed under the Unlicense and MIT licenses.

    You may use this code under the terms of either license.
    </pre>
      </li>
      <li class="license">
        <h3 id="MPL-2.0">
          Mozilla Public License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/upsuper/dtoa-short ">dtoa-short 0.3.3</a></li>
        </ul>
        <pre class="license-text">Mozilla Public License Version 2.0
    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

    1. Definitions
    --------------

    1.1. &quot;Contributor&quot;
        means each individual or legal entity that creates, contributes to
        the creation of, or owns Covered Software.

    1.2. &quot;Contributor Version&quot;
        means the combination of the Contributions of others (if any) used
        by a Contributor and that particular Contributor&#x27;s Contribution.

    1.3. &quot;Contribution&quot;
        means Covered Software of a particular Contributor.

    1.4. &quot;Covered Software&quot;
        means Source Code Form to which the initial Contributor has attached
        the notice in Exhibit A, the Executable Form of such Source Code
        Form, and Modifications of such Source Code Form, in each case
        including portions thereof.

    1.5. &quot;Incompatible With Secondary Licenses&quot;
        means

        (a) that the initial Contributor has attached the notice described
            in Exhibit B to the Covered Software; or

        (b) that the Covered Software was made available under the terms of
            version 1.1 or earlier of the License, but not also under the
            terms of a Secondary License.

    1.6. &quot;Executable Form&quot;
        means any form of the work other than Source Code Form.

    1.7. &quot;Larger Work&quot;
        means a work that combines Covered Software with other material, in
        a separate file or files, that is not Covered Software.

    1.8. &quot;License&quot;
        means this document.

    1.9. &quot;Licensable&quot;
        means having the right to grant, to the maximum extent possible,
        whether at the time of the initial grant or subsequently, any and
        all of the rights conveyed by this License.

    1.10. &quot;Modifications&quot;
        means any of the following:

        (a) any file in Source Code Form that results from an addition to,
            deletion from, or modification of the contents of Covered
            Software; or

        (b) any new file in Source Code Form that contains any Covered
            Software.

    1.11. &quot;Patent Claims&quot; of a Contributor
        means any patent claim(s), including without limitation, method,
        process, and apparatus claims, in any patent Licensable by such
        Contributor that would be infringed, but for the grant of the
        License, by the making, using, selling, offering for sale, having
        made, import, or transfer of either its Contributions or its
        Contributor Version.

    1.12. &quot;Secondary License&quot;
        means either the GNU General Public License, Version 2.0, the GNU
        Lesser General Public License, Version 2.1, the GNU Affero General
        Public License, Version 3.0, or any later versions of those
        licenses.

    1.13. &quot;Source Code Form&quot;
        means the form of the work preferred for making modifications.

    1.14. &quot;You&quot; (or &quot;Your&quot;)
        means an individual or a legal entity exercising rights under this
        License. For legal entities, &quot;You&quot; includes any entity that
        controls, is controlled by, or is under common control with You. For
        purposes of this definition, &quot;control&quot; means (a) the power, direct
        or indirect, to cause the direction or management of such entity,
        whether by contract or otherwise, or (b) ownership of more than
        fifty percent (50%) of the outstanding shares or beneficial
        ownership of such entity.

    2. License Grants and Conditions
    --------------------------------

    2.1. Grants

    Each Contributor hereby grants You a world-wide, royalty-free,
    non-exclusive license:

    (a) under intellectual property rights (other than patent or trademark)
        Licensable by such Contributor to use, reproduce, make available,
        modify, display, perform, distribute, and otherwise exploit its
        Contributions, either on an unmodified basis, with Modifications, or
        as part of a Larger Work; and

    (b) under Patent Claims of such Contributor to make, use, sell, offer
        for sale, have made, import, and otherwise transfer either its
        Contributions or its Contributor Version.

    2.2. Effective Date

    The licenses granted in Section 2.1 with respect to any Contribution
    become effective for each Contribution on the date the Contributor first
    distributes such Contribution.

    2.3. Limitations on Grant Scope

    The licenses granted in this Section 2 are the only rights granted under
    this License. No additional rights or licenses will be implied from the
    distribution or licensing of Covered Software under this License.
    Notwithstanding Section 2.1(b) above, no patent license is granted by a
    Contributor:

    (a) for any code that a Contributor has removed from Covered Software;
        or

    (b) for infringements caused by: (i) Your and any other third party&#x27;s
        modifications of Covered Software, or (ii) the combination of its
        Contributions with other software (except as part of its Contributor
        Version); or

    (c) under Patent Claims infringed by Covered Software in the absence of
        its Contributions.

    This License does not grant any rights in the trademarks, service marks,
    or logos of any Contributor (except as may be necessary to comply with
    the notice requirements in Section 3.4).

    2.4. Subsequent Licenses

    No Contributor makes additional grants as a result of Your choice to
    distribute the Covered Software under a subsequent version of this
    License (see Section 10.2) or under the terms of a Secondary License (if
    permitted under the terms of Section 3.3).

    2.5. Representation

    Each Contributor represents that the Contributor believes its
    Contributions are its original creation(s) or it has sufficient rights
    to grant the rights to its Contributions conveyed by this License.

    2.6. Fair Use

    This License is not intended to limit any rights You have under
    applicable copyright doctrines of fair use, fair dealing, or other
    equivalents.

    2.7. Conditions

    Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
    in Section 2.1.

    3. Responsibilities
    -------------------

    3.1. Distribution of Source Form

    All distribution of Covered Software in Source Code Form, including any
    Modifications that You create or to which You contribute, must be under
    the terms of this License. You must inform recipients that the Source
    Code Form of the Covered Software is governed by the terms of this
    License, and how they can obtain a copy of this License. You may not
    attempt to alter or restrict the recipients&#x27; rights in the Source Code
    Form.

    3.2. Distribution of Executable Form

    If You distribute Covered Software in Executable Form then:

    (a) such Covered Software must also be made available in Source Code
        Form, as described in Section 3.1, and You must inform recipients of
        the Executable Form how they can obtain a copy of such Source Code
        Form by reasonable means in a timely manner, at a charge no more
        than the cost of distribution to the recipient; and

    (b) You may distribute such Executable Form under the terms of this
        License, or sublicense it under different terms, provided that the
        license for the Executable Form does not attempt to limit or alter
        the recipients&#x27; rights in the Source Code Form under this License.

    3.3. Distribution of a Larger Work

    You may create and distribute a Larger Work under terms of Your choice,
    provided that You also comply with the requirements of this License for
    the Covered Software. If the Larger Work is a combination of Covered
    Software with a work governed by one or more Secondary Licenses, and the
    Covered Software is not Incompatible With Secondary Licenses, this
    License permits You to additionally distribute such Covered Software
    under the terms of such Secondary License(s), so that the recipient of
    the Larger Work may, at their option, further distribute the Covered
    Software under the terms of either this License or such Secondary
    License(s).

    3.4. Notices

    You may not remove or alter the substance of any license notices
    (including copyright notices, patent notices, disclaimers of warranty,
    or limitations of liability) contained within the Source Code Form of
    the Covered Software, except that You may alter any license notices to
    the extent required to remedy known factual inaccuracies.

    3.5. Application of Additional Terms

    You may choose to offer, and to charge a fee for, warranty, support,
    indemnity or liability obligations to one or more recipients of Covered
    Software. However, You may do so only on Your own behalf, and not on
    behalf of any Contributor. You must make it absolutely clear that any
    such warranty, support, indemnity, or liability obligation is offered by
    You alone, and You hereby agree to indemnify every Contributor for any
    liability incurred by such Contributor as a result of warranty, support,
    indemnity or liability terms You offer. You may include additional
    disclaimers of warranty and limitations of liability specific to any
    jurisdiction.

    4. Inability to Comply Due to Statute or Regulation
    ---------------------------------------------------

    If it is impossible for You to comply with any of the terms of this
    License with respect to some or all of the Covered Software due to
    statute, judicial order, or regulation then You must: (a) comply with
    the terms of this License to the maximum extent possible; and (b)
    describe the limitations and the code they affect. Such description must
    be placed in a text file included with all distributions of the Covered
    Software under this License. Except to the extent prohibited by statute
    or regulation, such description must be sufficiently detailed for a
    recipient of ordinary skill to be able to understand it.

    5. Termination
    --------------

    5.1. The rights granted under this License will terminate automatically
    if You fail to comply with any of its terms. However, if You become
    compliant, then the rights granted under this License from a particular
    Contributor are reinstated (a) provisionally, unless and until such
    Contributor explicitly and finally terminates Your grants, and (b) on an
    ongoing basis, if such Contributor fails to notify You of the
    non-compliance by some reasonable means prior to 60 days after You have
    come back into compliance. Moreover, Your grants from a particular
    Contributor are reinstated on an ongoing basis if such Contributor
    notifies You of the non-compliance by some reasonable means, this is the
    first time You have received notice of non-compliance with this License
    from such Contributor, and You become compliant prior to 30 days after
    Your receipt of the notice.

    5.2. If You initiate litigation against any entity by asserting a patent
    infringement claim (excluding declaratory judgment actions,
    counter-claims, and cross-claims) alleging that a Contributor Version
    directly or indirectly infringes any patent, then the rights granted to
    You by any and all Contributors for the Covered Software under Section
    2.1 of this License shall terminate.

    5.3. In the event of termination under Sections 5.1 or 5.2 above, all
    end user license agreements (excluding distributors and resellers) which
    have been validly granted by You or Your distributors under this License
    prior to termination shall survive termination.

    ************************************************************************
    *                                                                      *
    *  6. Disclaimer of Warranty                                           *
    *  -------------------------                                           *
    *                                                                      *
    *  Covered Software is provided under this License on an &quot;as is&quot;       *
    *  basis, without warranty of any kind, either expressed, implied, or  *
    *  statutory, including, without limitation, warranties that the       *
    *  Covered Software is free of defects, merchantable, fit for a        *
    *  particular purpose or non-infringing. The entire risk as to the     *
    *  quality and performance of the Covered Software is with You.        *
    *  Should any Covered Software prove defective in any respect, You     *
    *  (not any Contributor) assume the cost of any necessary servicing,   *
    *  repair, or correction. This disclaimer of warranty constitutes an   *
    *  essential part of this License. No use of any Covered Software is   *
    *  authorized under this License except under this disclaimer.         *
    *                                                                      *
    ************************************************************************

    ************************************************************************
    *                                                                      *
    *  7. Limitation of Liability                                          *
    *  --------------------------                                          *
    *                                                                      *
    *  Under no circumstances and under no legal theory, whether tort      *
    *  (including negligence), contract, or otherwise, shall any           *
    *  Contributor, or anyone who distributes Covered Software as          *
    *  permitted above, be liable to You for any direct, indirect,         *
    *  special, incidental, or consequential damages of any character      *
    *  including, without limitation, damages for lost profits, loss of    *
    *  goodwill, work stoppage, computer failure or malfunction, or any    *
    *  and all other commercial damages or losses, even if such party      *
    *  shall have been informed of the possibility of such damages. This   *
    *  limitation of liability shall not apply to liability for death or   *
    *  personal injury resulting from such party&#x27;s negligence to the       *
    *  extent applicable law prohibits such limitation. Some               *
    *  jurisdictions do not allow the exclusion or limitation of           *
    *  incidental or consequential damages, so this exclusion and          *
    *  limitation may not apply to You.                                    *
    *                                                                      *
    ************************************************************************

    8. Litigation
    -------------

    Any litigation relating to this License may be brought only in the
    courts of a jurisdiction where the defendant maintains its principal
    place of business and such litigation shall be governed by laws of that
    jurisdiction, without reference to its conflict-of-law provisions.
    Nothing in this Section shall prevent a party&#x27;s ability to bring
    cross-claims or counter-claims.

    9. Miscellaneous
    ----------------

    This License represents the complete agreement concerning the subject
    matter hereof. If any provision of this License is held to be
    unenforceable, such provision shall be reformed only to the extent
    necessary to make it enforceable. Any law or regulation which provides
    that the language of a contract shall be construed against the drafter
    shall not be used to construe this License against a Contributor.

    10. Versions of the License
    ---------------------------

    10.1. New Versions

    Mozilla Foundation is the license steward. Except as provided in Section
    10.3, no one other than the license steward has the right to modify or
    publish new versions of this License. Each version will be given a
    distinguishing version number.

    10.2. Effect of New Versions

    You may distribute the Covered Software under the terms of the version
    of the License under which You originally received the Covered Software,
    or under the terms of any subsequent version published by the license
    steward.

    10.3. Modified Versions

    If you create software not governed by this License, and you want to
    create a new license for such software, you may create and use a
    modified version of this License if you rename the license and remove
    any references to the name of the license steward (except to note that
    such modified license differs from this License).

    10.4. Distributing Source Code Form that is Incompatible With Secondary
    Licenses

    If You choose to distribute Source Code Form that is Incompatible With
    Secondary Licenses under the terms of this version of the License, the
    notice described in Exhibit B of this License must be attached.

    Exhibit A - Source Code Form License Notice
    -------------------------------------------

      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.

    If it is not possible or desirable to put the notice in a particular
    file, then You may include the notice in a location (such as a LICENSE
    file in a relevant directory) where a recipient would be likely to look
    for such a notice.

    You may add additional accurate notices of copyright ownership.

    Exhibit B - &quot;Incompatible With Secondary Licenses&quot; Notice
    ---------------------------------------------------------

      This Source Code Form is &quot;Incompatible With Secondary Licenses&quot;, as
      defined by the Mozilla Public License, v. 2.0.
    </pre>
      </li>
      <li class="license">
        <h3 id="MPL-2.0">
          Mozilla Public License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/servo/rust-cssparser ">cssparser 0.27.2</a></li>
          <li><a href=" https://github.com/servo/rust-cssparser ">cssparser-macros 0.6.0</a></li>
        </ul>
        <pre class="license-text">Mozilla Public License Version 2.0
    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

    1. Definitions
    --------------

    1.1. &quot;Contributor&quot;
        means each individual or legal entity that creates, contributes to
        the creation of, or owns Covered Software.

    1.2. &quot;Contributor Version&quot;
        means the combination of the Contributions of others (if any) used
        by a Contributor and that particular Contributor&#x27;s Contribution.

    1.3. &quot;Contribution&quot;
        means Covered Software of a particular Contributor.

    1.4. &quot;Covered Software&quot;
        means Source Code Form to which the initial Contributor has attached
        the notice in Exhibit A, the Executable Form of such Source Code
        Form, and Modifications of such Source Code Form, in each case
        including portions thereof.

    1.5. &quot;Incompatible With Secondary Licenses&quot;
        means

        (a) that the initial Contributor has attached the notice described
            in Exhibit B to the Covered Software; or

        (b) that the Covered Software was made available under the terms of
            version 1.1 or earlier of the License, but not also under the
            terms of a Secondary License.

    1.6. &quot;Executable Form&quot;
        means any form of the work other than Source Code Form.

    1.7. &quot;Larger Work&quot;
        means a work that combines Covered Software with other material, in
        a separate file or files, that is not Covered Software.

    1.8. &quot;License&quot;
        means this document.

    1.9. &quot;Licensable&quot;
        means having the right to grant, to the maximum extent possible,
        whether at the time of the initial grant or subsequently, any and
        all of the rights conveyed by this License.

    1.10. &quot;Modifications&quot;
        means any of the following:

        (a) any file in Source Code Form that results from an addition to,
            deletion from, or modification of the contents of Covered
            Software; or

        (b) any new file in Source Code Form that contains any Covered
            Software.

    1.11. &quot;Patent Claims&quot; of a Contributor
        means any patent claim(s), including without limitation, method,
        process, and apparatus claims, in any patent Licensable by such
        Contributor that would be infringed, but for the grant of the
        License, by the making, using, selling, offering for sale, having
        made, import, or transfer of either its Contributions or its
        Contributor Version.

    1.12. &quot;Secondary License&quot;
        means either the GNU General Public License, Version 2.0, the GNU
        Lesser General Public License, Version 2.1, the GNU Affero General
        Public License, Version 3.0, or any later versions of those
        licenses.

    1.13. &quot;Source Code Form&quot;
        means the form of the work preferred for making modifications.

    1.14. &quot;You&quot; (or &quot;Your&quot;)
        means an individual or a legal entity exercising rights under this
        License. For legal entities, &quot;You&quot; includes any entity that
        controls, is controlled by, or is under common control with You. For
        purposes of this definition, &quot;control&quot; means (a) the power, direct
        or indirect, to cause the direction or management of such entity,
        whether by contract or otherwise, or (b) ownership of more than
        fifty percent (50%) of the outstanding shares or beneficial
        ownership of such entity.

    2. License Grants and Conditions
    --------------------------------

    2.1. Grants

    Each Contributor hereby grants You a world-wide, royalty-free,
    non-exclusive license:

    (a) under intellectual property rights (other than patent or trademark)
        Licensable by such Contributor to use, reproduce, make available,
        modify, display, perform, distribute, and otherwise exploit its
        Contributions, either on an unmodified basis, with Modifications, or
        as part of a Larger Work; and

    (b) under Patent Claims of such Contributor to make, use, sell, offer
        for sale, have made, import, and otherwise transfer either its
        Contributions or its Contributor Version.

    2.2. Effective Date

    The licenses granted in Section 2.1 with respect to any Contribution
    become effective for each Contribution on the date the Contributor first
    distributes such Contribution.

    2.3. Limitations on Grant Scope

    The licenses granted in this Section 2 are the only rights granted under
    this License. No additional rights or licenses will be implied from the
    distribution or licensing of Covered Software under this License.
    Notwithstanding Section 2.1(b) above, no patent license is granted by a
    Contributor:

    (a) for any code that a Contributor has removed from Covered Software;
        or

    (b) for infringements caused by: (i) Your and any other third party&#x27;s
        modifications of Covered Software, or (ii) the combination of its
        Contributions with other software (except as part of its Contributor
        Version); or

    (c) under Patent Claims infringed by Covered Software in the absence of
        its Contributions.

    This License does not grant any rights in the trademarks, service marks,
    or logos of any Contributor (except as may be necessary to comply with
    the notice requirements in Section 3.4).

    2.4. Subsequent Licenses

    No Contributor makes additional grants as a result of Your choice to
    distribute the Covered Software under a subsequent version of this
    License (see Section 10.2) or under the terms of a Secondary License (if
    permitted under the terms of Section 3.3).

    2.5. Representation

    Each Contributor represents that the Contributor believes its
    Contributions are its original creation(s) or it has sufficient rights
    to grant the rights to its Contributions conveyed by this License.

    2.6. Fair Use

    This License is not intended to limit any rights You have under
    applicable copyright doctrines of fair use, fair dealing, or other
    equivalents.

    2.7. Conditions

    Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
    in Section 2.1.

    3. Responsibilities
    -------------------

    3.1. Distribution of Source Form

    All distribution of Covered Software in Source Code Form, including any
    Modifications that You create or to which You contribute, must be under
    the terms of this License. You must inform recipients that the Source
    Code Form of the Covered Software is governed by the terms of this
    License, and how they can obtain a copy of this License. You may not
    attempt to alter or restrict the recipients&#x27; rights in the Source Code
    Form.

    3.2. Distribution of Executable Form

    If You distribute Covered Software in Executable Form then:

    (a) such Covered Software must also be made available in Source Code
        Form, as described in Section 3.1, and You must inform recipients of
        the Executable Form how they can obtain a copy of such Source Code
        Form by reasonable means in a timely manner, at a charge no more
        than the cost of distribution to the recipient; and

    (b) You may distribute such Executable Form under the terms of this
        License, or sublicense it under different terms, provided that the
        license for the Executable Form does not attempt to limit or alter
        the recipients&#x27; rights in the Source Code Form under this License.

    3.3. Distribution of a Larger Work

    You may create and distribute a Larger Work under terms of Your choice,
    provided that You also comply with the requirements of this License for
    the Covered Software. If the Larger Work is a combination of Covered
    Software with a work governed by one or more Secondary Licenses, and the
    Covered Software is not Incompatible With Secondary Licenses, this
    License permits You to additionally distribute such Covered Software
    under the terms of such Secondary License(s), so that the recipient of
    the Larger Work may, at their option, further distribute the Covered
    Software under the terms of either this License or such Secondary
    License(s).

    3.4. Notices

    You may not remove or alter the substance of any license notices
    (including copyright notices, patent notices, disclaimers of warranty,
    or limitations of liability) contained within the Source Code Form of
    the Covered Software, except that You may alter any license notices to
    the extent required to remedy known factual inaccuracies.

    3.5. Application of Additional Terms

    You may choose to offer, and to charge a fee for, warranty, support,
    indemnity or liability obligations to one or more recipients of Covered
    Software. However, You may do so only on Your own behalf, and not on
    behalf of any Contributor. You must make it absolutely clear that any
    such warranty, support, indemnity, or liability obligation is offered by
    You alone, and You hereby agree to indemnify every Contributor for any
    liability incurred by such Contributor as a result of warranty, support,
    indemnity or liability terms You offer. You may include additional
    disclaimers of warranty and limitations of liability specific to any
    jurisdiction.

    4. Inability to Comply Due to Statute or Regulation
    ---------------------------------------------------

    If it is impossible for You to comply with any of the terms of this
    License with respect to some or all of the Covered Software due to
    statute, judicial order, or regulation then You must: (a) comply with
    the terms of this License to the maximum extent possible; and (b)
    describe the limitations and the code they affect. Such description must
    be placed in a text file included with all distributions of the Covered
    Software under this License. Except to the extent prohibited by statute
    or regulation, such description must be sufficiently detailed for a
    recipient of ordinary skill to be able to understand it.

    5. Termination
    --------------

    5.1. The rights granted under this License will terminate automatically
    if You fail to comply with any of its terms. However, if You become
    compliant, then the rights granted under this License from a particular
    Contributor are reinstated (a) provisionally, unless and until such
    Contributor explicitly and finally terminates Your grants, and (b) on an
    ongoing basis, if such Contributor fails to notify You of the
    non-compliance by some reasonable means prior to 60 days after You have
    come back into compliance. Moreover, Your grants from a particular
    Contributor are reinstated on an ongoing basis if such Contributor
    notifies You of the non-compliance by some reasonable means, this is the
    first time You have received notice of non-compliance with this License
    from such Contributor, and You become compliant prior to 30 days after
    Your receipt of the notice.

    5.2. If You initiate litigation against any entity by asserting a patent
    infringement claim (excluding declaratory judgment actions,
    counter-claims, and cross-claims) alleging that a Contributor Version
    directly or indirectly infringes any patent, then the rights granted to
    You by any and all Contributors for the Covered Software under Section
    2.1 of this License shall terminate.

    5.3. In the event of termination under Sections 5.1 or 5.2 above, all
    end user license agreements (excluding distributors and resellers) which
    have been validly granted by You or Your distributors under this License
    prior to termination shall survive termination.

    ************************************************************************
    *                                                                      *
    *  6. Disclaimer of Warranty                                           *
    *  -------------------------                                           *
    *                                                                      *
    *  Covered Software is provided under this License on an &quot;as is&quot;       *
    *  basis, without warranty of any kind, either expressed, implied, or  *
    *  statutory, including, without limitation, warranties that the       *
    *  Covered Software is free of defects, merchantable, fit for a        *
    *  particular purpose or non-infringing. The entire risk as to the     *
    *  quality and performance of the Covered Software is with You.        *
    *  Should any Covered Software prove defective in any respect, You     *
    *  (not any Contributor) assume the cost of any necessary servicing,   *
    *  repair, or correction. This disclaimer of warranty constitutes an   *
    *  essential part of this License. No use of any Covered Software is   *
    *  authorized under this License except under this disclaimer.         *
    *                                                                      *
    ************************************************************************

    ************************************************************************
    *                                                                      *
    *  7. Limitation of Liability                                          *
    *  --------------------------                                          *
    *                                                                      *
    *  Under no circumstances and under no legal theory, whether tort      *
    *  (including negligence), contract, or otherwise, shall any           *
    *  Contributor, or anyone who distributes Covered Software as          *
    *  permitted above, be liable to You for any direct, indirect,         *
    *  special, incidental, or consequential damages of any character      *
    *  including, without limitation, damages for lost profits, loss of    *
    *  goodwill, work stoppage, computer failure or malfunction, or any    *
    *  and all other commercial damages or losses, even if such party      *
    *  shall have been informed of the possibility of such damages. This   *
    *  limitation of liability shall not apply to liability for death or   *
    *  personal injury resulting from such party&#x27;s negligence to the       *
    *  extent applicable law prohibits such limitation. Some               *
    *  jurisdictions do not allow the exclusion or limitation of           *
    *  incidental or consequential damages, so this exclusion and          *
    *  limitation may not apply to You.                                    *
    *                                                                      *
    ************************************************************************

    8. Litigation
    -------------

    Any litigation relating to this License may be brought only in the
    courts of a jurisdiction where the defendant maintains its principal
    place of business and such litigation shall be governed by laws of that
    jurisdiction, without reference to its conflict-of-law provisions.
    Nothing in this Section shall prevent a party&#x27;s ability to bring
    cross-claims or counter-claims.

    9. Miscellaneous
    ----------------

    This License represents the complete agreement concerning the subject
    matter hereof. If any provision of this License is held to be
    unenforceable, such provision shall be reformed only to the extent
    necessary to make it enforceable. Any law or regulation which provides
    that the language of a contract shall be construed against the drafter
    shall not be used to construe this License against a Contributor.

    10. Versions of the License
    ---------------------------

    10.1. New Versions

    Mozilla Foundation is the license steward. Except as provided in Section
    10.3, no one other than the license steward has the right to modify or
    publish new versions of this License. Each version will be given a
    distinguishing version number.

    10.2. Effect of New Versions

    You may distribute the Covered Software under the terms of the version
    of the License under which You originally received the Covered Software,
    or under the terms of any subsequent version published by the license
    steward.

    10.3. Modified Versions

    If you create software not governed by this License, and you want to
    create a new license for such software, you may create and use a
    modified version of this License if you rename the license and remove
    any references to the name of the license steward (except to note that
    such modified license differs from this License).

    10.4. Distributing Source Code Form that is Incompatible With Secondary
    Licenses

    If You choose to distribute Source Code Form that is Incompatible With
    Secondary Licenses under the terms of this version of the License, the
    notice described in Exhibit B of this License must be attached.

    Exhibit A - Source Code Form License Notice
    -------------------------------------------

      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.

    If it is not possible or desirable to put the notice in a particular
    file, then You may include the notice in a location (such as a LICENSE
    file in a relevant directory) where a recipient would be likely to look
    for such a notice.

    You may add additional accurate notices of copyright ownership.

    Exhibit B - &quot;Incompatible With Secondary Licenses&quot; Notice
    ---------------------------------------------------------

      This Source Code Form is &quot;Incompatible With Secondary Licenses&quot;, as
      defined by the Mozilla Public License, v. 2.0.
    </pre>
      </li>
      <li class="license">
        <h3 id="MPL-2.0">
          Mozilla Public License 2.0
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/servo/servo ">selectors 0.22.0</a></li>
          <li><a href=" https://github.com/heycam/thin-slice ">thin-slice 0.1.1</a></li>
        </ul>
        <pre class="license-text">Mozilla Public License Version 2.0
    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

    1. Definitions
    --------------

    1.1. &quot;Contributor&quot;
        means each individual or legal entity that creates, contributes to
        the creation of, or owns Covered Software.

    1.2. &quot;Contributor Version&quot;
        means the combination of the Contributions of others (if any) used
        by a Contributor and that particular Contributor&#x27;s Contribution.

    1.3. &quot;Contribution&quot;
        means Covered Software of a particular Contributor.

    1.4. &quot;Covered Software&quot;
        means Source Code Form to which the initial Contributor has attached
        the notice in Exhibit A, the Executable Form of such Source Code
        Form, and Modifications of such Source Code Form, in each case
        including portions thereof.

    1.5. &quot;Incompatible With Secondary Licenses&quot;
        means

        (a) that the initial Contributor has attached the notice described
            in Exhibit B to the Covered Software; or

        (b) that the Covered Software was made available under the terms of
            version 1.1 or earlier of the License, but not also under the
            terms of a Secondary License.

    1.6. &quot;Executable Form&quot;
        means any form of the work other than Source Code Form.

    1.7. &quot;Larger Work&quot;
        means a work that combines Covered Software with other material, in
        a separate file or files, that is not Covered Software.

    1.8. &quot;License&quot;
        means this document.

    1.9. &quot;Licensable&quot;
        means having the right to grant, to the maximum extent possible,
        whether at the time of the initial grant or subsequently, any and
        all of the rights conveyed by this License.

    1.10. &quot;Modifications&quot;
        means any of the following:

        (a) any file in Source Code Form that results from an addition to,
            deletion from, or modification of the contents of Covered
            Software; or

        (b) any new file in Source Code Form that contains any Covered
            Software.

    1.11. &quot;Patent Claims&quot; of a Contributor
        means any patent claim(s), including without limitation, method,
        process, and apparatus claims, in any patent Licensable by such
        Contributor that would be infringed, but for the grant of the
        License, by the making, using, selling, offering for sale, having
        made, import, or transfer of either its Contributions or its
        Contributor Version.

    1.12. &quot;Secondary License&quot;
        means either the GNU General Public License, Version 2.0, the GNU
        Lesser General Public License, Version 2.1, the GNU Affero General
        Public License, Version 3.0, or any later versions of those
        licenses.

    1.13. &quot;Source Code Form&quot;
        means the form of the work preferred for making modifications.

    1.14. &quot;You&quot; (or &quot;Your&quot;)
        means an individual or a legal entity exercising rights under this
        License. For legal entities, &quot;You&quot; includes any entity that
        controls, is controlled by, or is under common control with You. For
        purposes of this definition, &quot;control&quot; means (a) the power, direct
        or indirect, to cause the direction or management of such entity,
        whether by contract or otherwise, or (b) ownership of more than
        fifty percent (50%) of the outstanding shares or beneficial
        ownership of such entity.

    2. License Grants and Conditions
    --------------------------------

    2.1. Grants

    Each Contributor hereby grants You a world-wide, royalty-free,
    non-exclusive license:

    (a) under intellectual property rights (other than patent or trademark)
        Licensable by such Contributor to use, reproduce, make available,
        modify, display, perform, distribute, and otherwise exploit its
        Contributions, either on an unmodified basis, with Modifications, or
        as part of a Larger Work; and

    (b) under Patent Claims of such Contributor to make, use, sell, offer
        for sale, have made, import, and otherwise transfer either its
        Contributions or its Contributor Version.

    2.2. Effective Date

    The licenses granted in Section 2.1 with respect to any Contribution
    become effective for each Contribution on the date the Contributor first
    distributes such Contribution.

    2.3. Limitations on Grant Scope

    The licenses granted in this Section 2 are the only rights granted under
    this License. No additional rights or licenses will be implied from the
    distribution or licensing of Covered Software under this License.
    Notwithstanding Section 2.1(b) above, no patent license is granted by a
    Contributor:

    (a) for any code that a Contributor has removed from Covered Software;
        or

    (b) for infringements caused by: (i) Your and any other third party&#x27;s
        modifications of Covered Software, or (ii) the combination of its
        Contributions with other software (except as part of its Contributor
        Version); or

    (c) under Patent Claims infringed by Covered Software in the absence of
        its Contributions.

    This License does not grant any rights in the trademarks, service marks,
    or logos of any Contributor (except as may be necessary to comply with
    the notice requirements in Section 3.4).

    2.4. Subsequent Licenses

    No Contributor makes additional grants as a result of Your choice to
    distribute the Covered Software under a subsequent version of this
    License (see Section 10.2) or under the terms of a Secondary License (if
    permitted under the terms of Section 3.3).

    2.5. Representation

    Each Contributor represents that the Contributor believes its
    Contributions are its original creation(s) or it has sufficient rights
    to grant the rights to its Contributions conveyed by this License.

    2.6. Fair Use

    This License is not intended to limit any rights You have under
    applicable copyright doctrines of fair use, fair dealing, or other
    equivalents.

    2.7. Conditions

    Sections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted
    in Section 2.1.

    3. Responsibilities
    -------------------

    3.1. Distribution of Source Form

    All distribution of Covered Software in Source Code Form, including any
    Modifications that You create or to which You contribute, must be under
    the terms of this License. You must inform recipients that the Source
    Code Form of the Covered Software is governed by the terms of this
    License, and how they can obtain a copy of this License. You may not
    attempt to alter or restrict the recipients&#x27; rights in the Source Code
    Form.

    3.2. Distribution of Executable Form

    If You distribute Covered Software in Executable Form then:

    (a) such Covered Software must also be made available in Source Code
        Form, as described in Section 3.1, and You must inform recipients of
        the Executable Form how they can obtain a copy of such Source Code
        Form by reasonable means in a timely manner, at a charge no more
        than the cost of distribution to the recipient; and

    (b) You may distribute such Executable Form under the terms of this
        License, or sublicense it under different terms, provided that the
        license for the Executable Form does not attempt to limit or alter
        the recipients&#x27; rights in the Source Code Form under this License.

    3.3. Distribution of a Larger Work

    You may create and distribute a Larger Work under terms of Your choice,
    provided that You also comply with the requirements of this License for
    the Covered Software. If the Larger Work is a combination of Covered
    Software with a work governed by one or more Secondary Licenses, and the
    Covered Software is not Incompatible With Secondary Licenses, this
    License permits You to additionally distribute such Covered Software
    under the terms of such Secondary License(s), so that the recipient of
    the Larger Work may, at their option, further distribute the Covered
    Software under the terms of either this License or such Secondary
    License(s).

    3.4. Notices

    You may not remove or alter the substance of any license notices
    (including copyright notices, patent notices, disclaimers of warranty,
    or limitations of liability) contained within the Source Code Form of
    the Covered Software, except that You may alter any license notices to
    the extent required to remedy known factual inaccuracies.

    3.5. Application of Additional Terms

    You may choose to offer, and to charge a fee for, warranty, support,
    indemnity or liability obligations to one or more recipients of Covered
    Software. However, You may do so only on Your own behalf, and not on
    behalf of any Contributor. You must make it absolutely clear that any
    such warranty, support, indemnity, or liability obligation is offered by
    You alone, and You hereby agree to indemnify every Contributor for any
    liability incurred by such Contributor as a result of warranty, support,
    indemnity or liability terms You offer. You may include additional
    disclaimers of warranty and limitations of liability specific to any
    jurisdiction.

    4. Inability to Comply Due to Statute or Regulation
    ---------------------------------------------------

    If it is impossible for You to comply with any of the terms of this
    License with respect to some or all of the Covered Software due to
    statute, judicial order, or regulation then You must: (a) comply with
    the terms of this License to the maximum extent possible; and (b)
    describe the limitations and the code they affect. Such description must
    be placed in a text file included with all distributions of the Covered
    Software under this License. Except to the extent prohibited by statute
    or regulation, such description must be sufficiently detailed for a
    recipient of ordinary skill to be able to understand it.

    5. Termination
    --------------

    5.1. The rights granted under this License will terminate automatically
    if You fail to comply with any of its terms. However, if You become
    compliant, then the rights granted under this License from a particular
    Contributor are reinstated (a) provisionally, unless and until such
    Contributor explicitly and finally terminates Your grants, and (b) on an
    ongoing basis, if such Contributor fails to notify You of the
    non-compliance by some reasonable means prior to 60 days after You have
    come back into compliance. Moreover, Your grants from a particular
    Contributor are reinstated on an ongoing basis if such Contributor
    notifies You of the non-compliance by some reasonable means, this is the
    first time You have received notice of non-compliance with this License
    from such Contributor, and You become compliant prior to 30 days after
    Your receipt of the notice.

    5.2. If You initiate litigation against any entity by asserting a patent
    infringement claim (excluding declaratory judgment actions,
    counter-claims, and cross-claims) alleging that a Contributor Version
    directly or indirectly infringes any patent, then the rights granted to
    You by any and all Contributors for the Covered Software under Section
    2.1 of this License shall terminate.

    5.3. In the event of termination under Sections 5.1 or 5.2 above, all
    end user license agreements (excluding distributors and resellers) which
    have been validly granted by You or Your distributors under this License
    prior to termination shall survive termination.

    ************************************************************************
    *                                                                      *
    *  6. Disclaimer of Warranty                                           *
    *  -------------------------                                           *
    *                                                                      *
    *  Covered Software is provided under this License on an &quot;as is&quot;       *
    *  basis, without warranty of any kind, either expressed, implied, or  *
    *  statutory, including, without limitation, warranties that the       *
    *  Covered Software is free of defects, merchantable, fit for a        *
    *  particular purpose or non-infringing. The entire risk as to the     *
    *  quality and performance of the Covered Software is with You.        *
    *  Should any Covered Software prove defective in any respect, You     *
    *  (not any Contributor) assume the cost of any necessary servicing,   *
    *  repair, or correction. This disclaimer of warranty constitutes an   *
    *  essential part of this License. No use of any Covered Software is   *
    *  authorized under this License except under this disclaimer.         *
    *                                                                      *
    ************************************************************************

    ************************************************************************
    *                                                                      *
    *  7. Limitation of Liability                                          *
    *  --------------------------                                          *
    *                                                                      *
    *  Under no circumstances and under no legal theory, whether tort      *
    *  (including negligence), contract, or otherwise, shall any           *
    *  Contributor, or anyone who distributes Covered Software as          *
    *  permitted above, be liable to You for any direct, indirect,         *
    *  special, incidental, or consequential damages of any character      *
    *  including, without limitation, damages for lost profits, loss of    *
    *  goodwill, work stoppage, computer failure or malfunction, or any    *
    *  and all other commercial damages or losses, even if such party      *
    *  shall have been informed of the possibility of such damages. This   *
    *  limitation of liability shall not apply to liability for death or   *
    *  personal injury resulting from such party&#x27;s negligence to the       *
    *  extent applicable law prohibits such limitation. Some               *
    *  jurisdictions do not allow the exclusion or limitation of           *
    *  incidental or consequential damages, so this exclusion and          *
    *  limitation may not apply to You.                                    *
    *                                                                      *
    ************************************************************************

    8. Litigation
    -------------

    Any litigation relating to this License may be brought only in the
    courts of a jurisdiction where the defendant maintains its principal
    place of business and such litigation shall be governed by laws of that
    jurisdiction, without reference to its conflict-of-law provisions.
    Nothing in this Section shall prevent a party&#x27;s ability to bring
    cross-claims or counter-claims.

    9. Miscellaneous
    ----------------

    This License represents the complete agreement concerning the subject
    matter hereof. If any provision of this License is held to be
    unenforceable, such provision shall be reformed only to the extent
    necessary to make it enforceable. Any law or regulation which provides
    that the language of a contract shall be construed against the drafter
    shall not be used to construe this License against a Contributor.

    10. Versions of the License
    ---------------------------

    10.1. New Versions

    Mozilla Foundation is the license steward. Except as provided in Section
    10.3, no one other than the license steward has the right to modify or
    publish new versions of this License. Each version will be given a
    distinguishing version number.

    10.2. Effect of New Versions

    You may distribute the Covered Software under the terms of the version
    of the License under which You originally received the Covered Software,
    or under the terms of any subsequent version published by the license
    steward.

    10.3. Modified Versions

    If you create software not governed by this License, and you want to
    create a new license for such software, you may create and use a
    modified version of this License if you rename the license and remove
    any references to the name of the license steward (except to note that
    such modified license differs from this License).

    10.4. Distributing Source Code Form that is Incompatible With Secondary
    Licenses

    If You choose to distribute Source Code Form that is Incompatible With
    Secondary Licenses under the terms of this version of the License, the
    notice described in Exhibit B of this License must be attached.

    Exhibit A - Source Code Form License Notice
    -------------------------------------------

      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at https://mozilla.org/MPL/2.0/.

    If it is not possible or desirable to put the notice in a particular
    file, then You may include the notice in a location (such as a LICENSE
    file in a relevant directory) where a recipient would be likely to look
    for such a notice.

    You may add additional accurate notices of copyright ownership.

    Exhibit B - &quot;Incompatible With Secondary Licenses&quot; Notice
    ---------------------------------------------------------

      This Source Code Form is &quot;Incompatible With Secondary Licenses&quot;, as
      defined by the Mozilla Public License, v. 2.0.
    </pre>
      </li>
      <li class="license">
        <h3 id="Unicode-DFS-2016">
          Unicode License Agreement - Data Files and Software (2016)
        </h3>
        <h4>Used by:</h4>
        <ul class="license-used-by">
          <li><a href=" https://github.com/dtolnay/unicode-ident ">unicode-ident 1.0.6</a></li>
        </ul>
        <pre class="license-text">UNICODE, INC. LICENSE AGREEMENT - DATA FILES AND SOFTWARE

    Unicode Data Files include all data files under the directories http://www.unicode.org/Public/, http://www.unicode.org/reports/, http://www.unicode.org/cldr/data/, http://source.icu-project.org/repos/icu/, and http://www.unicode.org/utility/trac/browser/.

    Unicode Data Files do not include PDF online code charts under the directory http://www.unicode.org/Public/.

    Software includes any source code published in the Unicode Standard or under the directories http://www.unicode.org/Public/, http://www.unicode.org/reports/, http://www.unicode.org/cldr/data/, http://source.icu-project.org/repos/icu/, and http://www.unicode.org/utility/trac/browser/.

    NOTICE TO USER: Carefully read the following legal agreement. BY DOWNLOADING, INSTALLING, COPYING OR OTHERWISE USING UNICODE INC.&#x27;S DATA FILES (&quot;DATA FILES&quot;), AND/OR SOFTWARE (&quot;SOFTWARE&quot;), YOU UNEQUIVOCALLY ACCEPT, AND AGREE TO BE BOUND BY, ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT. IF YOU DO NOT AGREE, DO NOT DOWNLOAD, INSTALL, COPY, DISTRIBUTE OR USE THE DATA FILES OR SOFTWARE.

    COPYRIGHT AND PERMISSION NOTICE

    Copyright ┬® 1991-2016 Unicode, Inc. All rights reserved. Distributed under the Terms of Use in http://www.unicode.org/copyright.html.

    Permission is hereby granted, free of charge, to any person obtaining a copy of the Unicode data files and any associated documentation (the &quot;Data Files&quot;) or Unicode software and any associated documentation (the &quot;Software&quot;) to deal in the Data Files or Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, and/or sell copies of the Data Files or Software, and to permit persons to whom the Data Files or Software are furnished to do so, provided that either

         (a) this copyright and permission notice appear with all copies of the Data Files or Software, or
         (b) this copyright and permission notice appear in associated Documentation.

    THE DATA FILES AND SOFTWARE ARE PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR HOLDERS INCLUDED IN THIS NOTICE BE LIABLE FOR ANY CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THE DATA FILES OR SOFTWARE.

    Except as contained in this notice, the name of a copyright holder shall not be used in advertising or otherwise to promote the sale, use or other dealings in these Data Files or Software without prior written authorization of the copyright holder.
    </pre>
      </li>
    </ul>
  </main>
</template>

<style>
    h3 {
        @apply font-bold text-3xl pb-2
    }

    pre {
        @apply mb-8
    }
</style>
