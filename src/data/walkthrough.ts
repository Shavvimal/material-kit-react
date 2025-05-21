/*
 * flow_id
 * flow_version_id
 * flow_run_id
 */

const devData = {
  flow_id: '54436ecf-ef14-40c1-88cc-2ae5e3bdfb7f',
  flow_version_id: '0e9aa3d2-bcf3-4c6a-814c-4d6a30da3660',
  title: 'How to Add a Payment Method',
  content: 'content',
  walkthrough_data: {
    history: [
      {
        state: {
          url: 'https://demo.deel.com/dashboard',
          tabs: [
            {
              url: 'https://demo.deel.com/dashboard',
              title: 'Deel - Your forever people platform',
              page_id: 0,
            },
          ],
          title: 'Deel - Your forever people platform',
          screenshot:
            '00af2909-a09d-4972-b15f-6d13e7185acc/c7093abf-fe88-4f2f-93e1-016b7fcdb42f/1/agent-screenshot.png',
          interacted_element: [
            {
              xpath: '/html/body/div[1]/div[1]/nav/ul/li[1]/a',
              el_text: 'Overview',
              tag_name: 'a',
              attributes: {
                id: ':rq:',
                type: 'a',
                class: 'MuiBox-root mui-1vy2sf3',
                tabindex: '0',
                href: '/dashboard',
              },
              shadow_root: false,
              highlight_index: 13,
              entire_parent_branch_path: ['div', 'div', 'div', 'div', 'div', 'div', 'div', 'div', 'a', 'button'],
            },
          ],
        },
        result: [
          {
            is_done: false,
            is_loop: false,
            screenshot:
              '00af2909-a09d-4972-b15f-6d13e7185acc/c7093abf-fe88-4f2f-93e1-016b7fcdb42f/1/action_ss_76fceaaa-557b-4145-b84e-856c1307fc25.png',
            extracted_content: '🖱️  Clicked button with index 13: ',
            include_in_memory: true,
            interacted_element_composite_key:
              '00af2909-a09d-4972-b15f-6d13e7185acc:21c1f28fbe5c5f766c46b99d45f7c216db9ede87528453ecd82e88be72742fd9:https://demo.deel.com/',
          },
        ],
        user_text:
          'Click the Organization Settings (gear) icon to open your company-wide configuration dashboard, where you can manage billing, payments, and other organizational settings.',
        model_output: {
          action: [
            {
              click_element: {
                index: 13,
              },
            },
          ],
          current_state: {
            memory: 'Need to navigate to Organization Settings to add a new payment method',
            next_goal: 'Click the Organization Settings icon on the home page',
            evaluation_previous_goal: 'Unknown - Starting new task',
          },
        },
      },
    ],
    video_url: '00af2909-a09d-4972-b15f-6d13e7185acc/c7093abf-fe88-4f2f-93e1-016b7fcdb42f/video.webm',
  },
  similarity_score: 1,
};
export default devData;
