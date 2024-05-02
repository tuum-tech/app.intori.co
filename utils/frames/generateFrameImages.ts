import Jimp from 'jimp'
import { Font } from '@jimp/plugin-print'
import * as path from 'path'
import { intoriFrameForms } from './intoriFrameForms'

let kumbhSans32: Font
let kumbhSans21: Font

const loadKumbSans32 = async () => {
  const pathToFont = path.join(
    process.cwd(),
    'public/assets/frames/kumbh_sans_32.fnt'
  )
  return await Jimp.loadFont(pathToFont)
}

const loadKumbSans21 = async () => {
  const pathToFont = path.join(
    process.cwd(),
    'public/assets/frames/kumbh_sans_21.fnt'
  )
  return await Jimp.loadFont(pathToFont)
}

const loadFonts = async () => {
  kumbhSans32 = await loadKumbSans32()
  kumbhSans21 = await loadKumbSans21()
}

const generateQuestionnaireStepImage = async (
  title: string,
  subtitle: string,
): Promise<Jimp> => {
  await loadFonts()

  const image = await Jimp.read(
    path.join(
      process.cwd(),
      'public/assets/frames/step_template.png'
    )
  )

  image.print(
    kumbhSans32,
    93,
    178,
    {
      text: title,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    },
    583,
    40
  )

  image.print(
    kumbhSans21,
    0,
    233,
    {
      text: subtitle,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    },
    768,
    26
  )

  return image
}

export const generateQuestionnaireStepImages = async () => {
  const sequences = Object.keys(intoriFrameForms)
  const pathPrefix = path.join(
    process.cwd(),
    'public/assets/frames'
  )
  for ( let i = 0; i < sequences.length; i++ ) {
    const sequence = intoriFrameForms[sequences[i]]

    const framePathPrefix = path.join(
      pathPrefix,
      sequence.name
    )

    const firstFrame = await generateQuestionnaireStepImage(
      sequence.name,
      'Interactive Profile Building Experience'
    )

    firstFrame.writeAsync(path.join(framePathPrefix, '/1.png'))

    for (let stepIndex = 0; stepIndex < sequence.steps.length; stepIndex++) {
      const step = sequence.steps[stepIndex]
      if (!step.question) {
        continue
      }

      const stepImage = await generateQuestionnaireStepImage(
        step.title,
        step.question
      )

      await stepImage.writeAsync(
        path.join(
          framePathPrefix,
          `${stepIndex + 2}.png`
        )
      )
    }
  }
  console.log('Done generating questionnaire step images.')
}

generateQuestionnaireStepImages()
