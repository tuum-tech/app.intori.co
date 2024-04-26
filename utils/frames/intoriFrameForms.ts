export type IntoriFrameStepType = {
  title: string
  inputs: {
    type: 'button'
    content: string
    action?: 'link'
    target?: string
  }[]
}

export type IntoriFrameFormType = {
  name: string
  steps: IntoriFrameStepType[]
}

export const introductionStep: IntoriFrameStepType = {
    title: 'Intori',
    inputs: [
      {
        type: 'button',
        content: 'Go!'
      },
      {
        type: 'button',
        content: 'Learn More',
        action: 'link',
        target: 'https://www.intori.co/'
      }
    ]
}

export const finalStep: IntoriFrameStepType = {
    title: 'Congrats – your profile is growing!',
    inputs: [
      {
        type: 'button',
        content: 'View Profile'
      },
      {
        type: 'button',
        content: 'Share'
      }
    ]
}

export const intoriFrameForms: Record<string, IntoriFrameFormType> = {
  initial: {
    name: 'initial',
    steps: [
      {
        title: 'Professional Experience',
        inputs: [
          {
            type: 'button',
            content: 'Employed'
          },
          {
            type: 'button',
            content: 'Self-employed'
          },
          {
            type: 'button',
            content: 'Freelancer'
          },
          {
            type: 'button',
            content: 'More'
          },
        ]
      },
      {
        title: 'Professional Experience',
        inputs: [
          {
            type: 'button',
            content: 'Student'
          },
          {
            type: 'button',
            content: 'Retired'
          },
          {
            type: 'button',
            content: 'Job Seeking'
          },
          {
            type: 'button',
            content: 'Other'
          },
        ]
      },
      {
        title: 'Skills and Endorsements',
        inputs: [
          {
            type: 'button',
            content: 'Programming'
          },
          {
            type: 'button',
            content: 'Design'
          },
          {
            type: 'button',
            content: 'Management'
          },
          {
            type: 'button',
            content: 'More'
          },
        ]
      },
      {
        title: 'Skills and Endorsements',
        inputs: [
          {
            type: 'button',
            content: 'Sales'
          },
          {
            type: 'button',
            content: 'Marketing'
          },
          {
            type: 'button',
            content: 'Education'
          },
          {
            type: 'button',
            content: 'Other'
          },
        ]
      }
    ]
  },
  personalValues: {
      name: 'personalValues',
      steps: [
        {
            title: 'Personal Values & Goals',
            inputs: [
              {
                type: 'button',
                content: 'Life Balance'
              },
              {
                type: 'button',
                content: '$$ Stability'
              },
              {
                type: 'button',
                content: 'Growth'
              },
              {
                type: 'button',
                content: 'Next'
              },
            ]
        },
        {
            title: 'Personal Values & Goals',
            inputs: [
              {
                type: 'button',
                content: 'Positive Impact'
              },
              {
                type: 'button',
                content: 'Innovation'
              },
              {
                type: 'button',
                content: 'Collaboration'
              },
              {
                type: 'button',
                content: 'Other'
              },
            ]
        },
        {
            title: 'Education & Certifications',
            inputs: [
              {
                type: 'button',
                content: 'High School'
              },
              {
                type: 'button',
                content: 'Associate\'s'
              },
              {
                type: 'button',
                content: 'Bachelor\'s'
              },
              {
                type: 'button',
                content: 'Next'
              },
            ]
        },
        {
            title: 'Education & Certifications',
            inputs: [
              {
                type: 'button',
                content: 'Master\'s'
              },
              {
                type: 'button',
                content: 'Doctorate'
              },
              {
                type: 'button',
                content: 'Certification'
              },
              {
                type: 'button',
                content: 'Other'
              }
            ]
        }
      ]
  },
  lifeStyle: {
    name: 'lifeStyle',
    steps: [
      {
        title: 'Lifestyle and Wellness',
        inputs: [
          {
            type: 'button',
            content: 'Gym'
          },
          {
            type: 'button',
            content: 'Running'
          },
          {
            type: 'button',
            content: 'Yoga'
          },
          {
            type: 'button',
            content: 'More'
          },
        ]
      },
      {
        title: 'Lifestyle and Wellness',
        inputs: [
          {
            type: 'button',
            content: 'Sports'
          },
          {
            type: 'button',
            content: 'Home Workout'
          },
          {
            type: 'button',
            content: 'Outside'
          },
          {
            type: 'button',
            content: 'None'
          },
        ]
      },
      {
        title: 'Lifestyle and Wellness',
        inputs: [
          {
            type: 'button',
            content: 'Early Bird'
          },
          {
            type: 'button',
            content: 'Night Owl'
          },
          {
            type: 'button',
            content: 'Insomniac'
          },
          {
            type: 'button',
            content: 'More'
          },
        ]
      },
      {
        title: 'Lifestyle and Wellness',
        inputs: [
          {
            type: 'button',
            content: 'Heavy Sleep'
          },
          {
            type: 'button',
            content: 'Variable'
          },
          {
            type: 'button',
            content: 'Regular Naps'
          },
          {
            type: 'button',
            content: 'Other'
          }
        ]
      }
    ]
  }
}
