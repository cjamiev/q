import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/atoms/Button';
import { runNpmScript, getDependencyVersions, updatePackage } from './projectPackageActions';
import { parseObject, isJSONString } from '../../../utils/type-check';
import TextArea from '../../../components/atoms/Form/TextArea';
import { SCPackageTextWrapper } from './styles';
import { copyToClipboard } from '../../../utils/copy';

const getPackageJson = (content) => {
  const isValid = isJSONString(content);
  if (isValid) {
    return JSON.parse(content);
  }

  return '';
}

const PackageCommands = ({ scripts }) => {
  if (!scripts) {
    return null;
  }

  return <>
    {Object.keys(scripts).map((scriptName) => {
      return (
        <Button
          isSecondary
          key={scriptName}
          label={scriptName}
          onClick={() => {
            copyToClipboard(`npm run ${scriptName}`);
          }}
        />
      );
    })}
  </>
}

const Package = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const packageJson = getPackageJson(content);

  useEffect(() => {
    if (packageJson.dependencies || packageJson.devDependencies) {
      const packages = JSON.stringify({
        dependencies: packageJson.dependencies,
        devDependencies: packageJson.devDependencies
      })

      console.log(packages);
    }
  })

  return (
    <div>
      <SCPackageTextWrapper>
        <TextArea
          ariaLabel="Enter Content"
          selected={content}
          onChange={({ selected }) => {
            setContent(selected);
          }}
        />
      </SCPackageTextWrapper>
      <PackageCommands scripts={packageJson?.scripts} />
    </div>
  );
};

export default Package;
